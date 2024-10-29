<script setup>
import { ref, onMounted, watch } from "vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import AddressSearch from "./AddressSearch.vue";
import { usePropiedadesStore } from "@/stores/propiedadesStore";
import axios from "axios";

const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({}),
    },
    mode: {
        type: String,
        default: "create",
    },
});

const emit = defineEmits(["submit", "cancel"]);

const propiedadesStore = usePropiedadesStore();

const propiedad = ref({
    titulo: "",
    tipo: "",
    descripcion: "",
    precio: "",
    direccion: "",
    clients: [],
    latitud: -43.29969127755103,
    longitud: -65.1023,
    ...props.initialData,
});

const imagen_portada = ref(null);
const imagenes = ref([]);
const isSubmitting = ref(false);
const errorMessage = ref("");

const mapCenter = ref([-43.29969127755103, -65.1021053755102]);
const zoom = ref(13);

const tiposPropiedad = [
    "Casa",
    "Departamento",
    "Oficina",
    "Local Comercial",
    "Terreno",
    "Galpón",
    "Otros",
];

const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    propiedad.value.latitud = lat;
    propiedad.value.longitud = lng;
    mapCenter.value = [lat, lng];
};

const handleLocationSelect = (location) => {
    propiedad.value.direccion = location.address;
    propiedad.value.latitud = location.lat;
    propiedad.value.longitud = location.lng;
    mapCenter.value = [location.lat, location.lng];
};

const handlePortadaUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        imagen_portada.value = files[0];
    }
};

const handleImagenesUpload = (event) => {
    const files = event.target.files;
    if (files) {
        imagenes.value = Array.from(files);
    }
};

const submitForm = async () => {
    if (isSubmitting.value) return;

    console.log("Enviando formulario..."); // Verificar que el formulario se envíe solo una vez

    try {
        isSubmitting.value = true;
        errorMessage.value = "";
        console.log("Iniciando envío del formulario");

        const formData = new FormData();

        // Agregar datos básicos de la propiedad
        Object.entries(propiedad.value).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });

        // Agregar latitud y longitud
        formData.set("latitud", propiedad.value.latitud);
        formData.set("longitud", propiedad.value.longitud);

        // Agregar imagen de portada
        if (imagen_portada.value) {
            formData.append("imagen_portada", imagen_portada.value);
            console.log(
                "Agregada imagen de portada:",
                imagen_portada.value.name,
            );
        } else if (props.mode === "create") {
            throw new Error("La imagen de portada es requerida");
        }

        // Agregar imágenes adicionales
        imagenes.value.forEach((file, index) => {
            formData.append("imagenes", file);
            console.log(`Agregada imagen adicional ${index + 1}:`, file.name);
        });

        // Log del contenido del FormData
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(
                    `${key}: File - ${value.name} (${value.size} bytes)`,
                );
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        const url =
            props.mode === "create"
                ? "http://localhost:3002/api/properties"
                : `http://localhost:3002/api/properties/${propiedad.value._id}`;

        const method = props.mode === "create" ? "post" : "put";

        const response = await axios({
            method,
            url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                );
                console.log("Progreso de subida:", percentCompleted + "%");
            },
        });

        console.log("Respuesta del servidor:", response.data);
        emit("submit", response.data);

        propiedad.value = {
            titulo: "",
            tipo: "",
            descripcion: "",
            precio: "",
            direccion: "",
            clients: [],
            latitud: -34.603722,
            longitud: -58.381592,
        };
        imagen_portada.value = null;
        imagenes.value = [];

        alert(
            props.mode === "create"
                ? "Propiedad agregada exitosamente"
                : "Propiedad actualizada exitosamente",
        );
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        errorMessage.value =
            "Error al agregar la propiedad. Por favor, intente nuevamente.";
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    mapCenter.value = [...mapCenter.value];
});

watch(
    () => props.initialData,
    (newVal) => {
        propiedad.value = { ...newVal };
    },
    { immediate: true },
);
</script>

<template>
    <form @submit.prevent="submitForm" class="space-y-6">
        <div class="grid grid-cols-1 gap-6">
            <!-- Información básica -->
            <div>
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Título
                </label>
                <input
                    v-model="propiedad.titulo"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Tipo
                    </label>
                    <select
                        v-model="propiedad.tipo"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    >
                        <option value="">Seleccione un tipo</option>
                        <option
                            v-for="tipo in tiposPropiedad"
                            :key="tipo"
                            :value="tipo"
                        >
                            {{ tipo }}
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Precio
                    </label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <div
                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        >
                            <span class="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                            v-model="propiedad.precio"
                            type="number"
                            required
                            class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Descripción
                </label>
                <textarea
                    v-model="propiedad.descripcion"
                    rows="3"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                ></textarea>
            </div>

            <!-- Ubicación -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Ubicación
                </h3>

                <AddressSearch
                    v-model="propiedad.direccion"
                    @select-location="handleLocationSelect"
                />

                <div class="h-[300px] rounded-lg overflow-hidden">
                    <LMap
                        v-model:zoom="zoom"
                        :center="mapCenter"
                        @click="handleMapClick"
                        :useGlobalLeaflet="true"
                    >
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LMarker
                            v-if="propiedad.latitud && propiedad.longitud"
                            :lat-lng="[propiedad.latitud, propiedad.longitud]"
                        />
                    </LMap>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Latitud
                        </label>
                        <input
                            v-model="propiedad.latitud"
                            type="number"
                            step="any"
                            readonly
                            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-600"
                        />
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Longitud
                        </label>
                        <input
                            v-model="propiedad.longitud"
                            type="number"
                            step="any"
                            readonly
                            class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 dark:bg-gray-600"
                        />
                    </div>
                </div>
            </div>

            <!-- Imágenes -->
            <div class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Imágenes
                </h3>

                <!-- Imagen de portada -->
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Imagen de portada
                    </label>
                    <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                    >
                        <div class="space-y-1 text-center">
                            <div v-if="imagen_portada" class="relative">
                                <img
                                    :src="URL.createObjectURL(imagen_portada)"
                                    class="mx-auto h-32 w-auto"
                                    alt="Portada"
                                />
                                <button
                                    type="button"
                                    class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                    @click="imagen_portada = null"
                                >
                                    <XMarkIcon class="h-4 w-4" />
                                </button>
                            </div>
                            <div v-else>
                                <label
                                    class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Subir imagen</span>
                                    <input
                                        type="file"
                                        class="sr-only"
                                        accept="image/*"
                                        @change="handlePortadaUpload"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Galería de imágenes -->
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Galería de imágenes
                    </label>
                    <div class="mt-2 grid grid-cols-3 gap-4">
                        <div
                            v-for="(imagen, index) in imagenes"
                            :key="index"
                            class="relative"
                        >
                            <img
                                :src="URL.createObjectURL(imagen)"
                                class="h-24 w-full object-cover rounded-lg"
                                alt="Imagen adicional"
                            />
                            <button
                                type="button"
                                class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                                @click="imagenes.splice(index, 1)"
                            >
                                <XMarkIcon class="h-4 w-4" />
                            </button>
                        </div>
                        <label
                            class="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-gray-400"
                        >
                            <input
                                type="file"
                                multiple
                                class="sr-only"
                                accept="image/*"
                                @change="handleImagenesUpload"
                            />
                            <PlusIcon class="h-6 w-6 text-gray-400" />
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-end gap-3 pt-6">
            <button
                type="button"
                class="btn-secondary"
                @click="$emit('cancel')"
            >
                Cancelar
            </button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
                {{
                    props.mode === "create"
                        ? "Crear Propiedad"
                        : "Guardar Cambios"
                }}
            </button>
        </div>
        <p v-if="errorMessage" class="mt-2 text-sm text-red-600">
            {{ errorMessage }}
        </p>
    </form>
</template>

<style>
@import "leaflet/dist/leaflet.css";

.leaflet-container {
    width: 100%;
    height: 100%;
}

.leaflet-control-container .leaflet-control {
    z-index: 0 !important;
}

.leaflet-pane {
    z-index: 0 !important;
}

.leaflet-top,
.leaflet-bottom {
    z-index: 0 !important;
}
</style>
