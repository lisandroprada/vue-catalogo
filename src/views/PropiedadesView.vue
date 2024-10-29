<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import PropiedadForm from "@/components/propiedades/PropiedadForm.vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import {
    FunnelIcon,
    BuildingOfficeIcon,
    HeartIcon,
    MapPinIcon,
    ListBulletIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";
import { usePropiedadesStore } from "@/stores/propiedadesStore";

const router = useRouter();
const showMap = ref(true);
const showFilters = ref(false);
const showForm = ref(false);
const selectedProperty = ref(null);

const propiedadesStore = usePropiedadesStore();
propiedadesStore.fetchPropiedades();

const mapCenter = ref([-43.29969127755103, -65.1021053755102]); // Definir mapCenter
const zoom = ref(13); // Definir zoom

const handlePropertyClick = (property) => {
    router.push(`/propiedades/${property._id}`);
};

const handleNewProperty = () => {
    showForm.value = true;
};

const handleFormSubmit = async (data) => {
    try {
        await propiedadesStore.createPropiedad(data);
        showForm.value = false;
    } catch (error) {
        console.error("Error al crear propiedad:", error);
    }
};

const handleFormCancel = () => {
    showForm.value = false;
};

// Helper function to get absolute URL for images
const getAbsoluteImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:3002/${url}`;
};
</script>

<template>
    <div class="z-index-adjust">
        <ViewWrapper
            title="Propiedades"
            subtitle="Explora nuestras propiedades disponibles"
        >
            <template #actions>
                <div class="flex items-center gap-3">
                    <!-- Toggle Map/List View -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                        <button
                            @click="showMap = true"
                            :class="[
                                'px-4 py-2 text-sm rounded-l-lg',
                                showMap
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                    : 'text-gray-600 dark:text-gray-400',
                            ]"
                        >
                            <MapPinIcon class="h-5 w-5" />
                        </button>
                        <button
                            @click="showMap = false"
                            :class="[
                                'px-4 py-2 text-sm rounded-r-lg',
                                !showMap
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                    : 'text-gray-600 dark:text-gray-400',
                            ]"
                        >
                            <ListBulletIcon class="h-5 w-5" />
                        </button>
                    </div>

                    <button
                        @click="showFilters = true"
                        class="btn-secondary flex items-center gap-2"
                    >
                        <FunnelIcon class="h-5 w-5" />
                        Filtros
                    </button>

                    <button
                        @click="handleNewProperty"
                        class="btn-primary flex items-center gap-2"
                    >
                        <BuildingOfficeIcon class="h-5 w-5" />
                        Agregar
                    </button>
                </div>
            </template>

            <!-- Contenedor principal -->
            <div class="mt-6 flex h-[calc(100vh-12rem)] overflow-hidden">
                <!-- Lista de Propiedades -->
                <div
                    :class="[
                        'overflow-y-auto pr-4',
                        showMap && !showForm ? 'w-1/2' : 'w-full',
                    ]"
                >
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div
                            v-for="property in propiedadesStore.propiedades"
                            :key="property._id"
                            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            @click="handlePropertyClick(property)"
                        >
                            <div class="relative">
                                <img
                                    :src="
                                        getAbsoluteImageUrl(
                                            property.imagen_portada_url,
                                        )
                                    "
                                    class="h-48 w-full object-cover rounded-t-lg"
                                    alt="Property"
                                />
                                <button
                                    class="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
                                    @click.stop
                                >
                                    <HeartIcon class="h-5 w-5" />
                                </button>
                            </div>

                            <div class="p-4">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h3
                                            class="text-lg font-medium text-gray-900 dark:text-white"
                                        >
                                            {{ property.titulo }}
                                        </h3>
                                        <p
                                            class="text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            {{ property.tipo }} ·
                                            {{ property.status }}
                                        </p>
                                    </div>
                                    <p
                                        class="text-lg font-semibold text-blue-600 dark:text-blue-400"
                                    >
                                        ${{ property.precio.toLocaleString() }}
                                    </p>
                                </div>

                                <div
                                    class="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
                                >
                                    <span
                                        v-if="
                                            property.features &&
                                            property.features.beds !== undefined
                                        "
                                        >{{ property.features.beds }} hab</span
                                    >
                                    <span
                                        v-if="
                                            property.features &&
                                            property.features.baths !==
                                                undefined
                                        "
                                        >{{
                                            property.features.baths
                                        }}
                                        baños</span
                                    >
                                    <span
                                        v-if="
                                            property.features &&
                                            property.features.area !== undefined
                                        "
                                        >{{ property.features.area }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mapa principal (se oculta cuando el drawer está abierto) -->
                <div
                    v-if="showMap && !showForm"
                    class="w-1/2 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden"
                >
                    <LMap
                        v-model:zoom="zoom"
                        v-model:center="mapCenter"
                        :use-global-leaflet="false"
                        class="h-full w-full"
                    >
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            layer-type="base"
                            name="OpenStreetMap"
                        />
                        <LMarker
                            v-for="property in propiedadesStore.propiedades"
                            :key="property._id"
                            :lat-lng="[property.latitud, property.longitud]"
                            @click="handlePropertyClick(property)"
                        >
                            <LPopup>
                                <div class="p-2">
                                    <h3 class="font-medium">
                                        {{ property.titulo }}
                                    </h3>
                                    <p class="text-sm text-gray-600">
                                        ${{ property.precio.toLocaleString() }}
                                    </p>
                                </div>
                            </LPopup>
                        </LMarker>
                    </LMap>
                </div>
            </div>

            <!-- Modal/Drawer del formulario -->
            <div v-if="showForm" class="fixed inset-0 overflow-hidden z-[1000]">
                <!-- Overlay -->
                <div
                    class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    @click="showForm = false"
                />

                <!-- Drawer -->
                <div
                    class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
                >
                    <div class="w-screen max-w-2xl">
                        <div
                            class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl"
                        >
                            <!-- Header -->
                            <div
                                class="flex-shrink-0 px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6"
                            >
                                <div class="flex items-center justify-between">
                                    <h2
                                        class="text-lg font-medium text-gray-900 dark:text-white"
                                    >
                                        Nueva Propiedad
                                    </h2>
                                    <button
                                        @click="showForm = false"
                                        class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <XMarkIcon class="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <!-- Contenido del formulario -->
                            <div
                                class="flex-1 overflow-y-scroll px-4 py-6 sm:px-6"
                            >
                                <PropiedadForm
                                    @submit="handleFormSubmit"
                                    @cancel="handleFormCancel"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewWrapper>
    </div>
</template>

<style scoped>
.overflow-y-auto {
    scrollbar-gutter: stable;
    scroll-behavior: smooth;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: rgba(156, 163, 175, 0.7);
}
</style>
