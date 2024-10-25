<script setup>
import { ref, onMounted, nextTick } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios"; // Importar axios para realizar la solicitud a la API
import {
    ArrowLeftIcon,
    ExclamationTriangleIcon,
    HomeIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    UserIcon,
    PencilIcon,
} from "@heroicons/vue/24/outline";
import "vue3-carousel/dist/carousel.css"; // Importar los estilos de vue3-carousel
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel"; // Importar vue3-carousel

const route = useRoute();
const router = useRouter();
const propiedad = ref(null);
const loading = ref(true);
const error = ref(null);
const infoContainerRef = ref(null);
const carouselRef = ref(null);
const isEditing = ref(false); // Estado para controlar si estamos en modo edición

// Helper function to get absolute URL for images
const getAbsoluteImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:3002/${url}`;
};

const adjustCarouselHeight = () => {
    if (infoContainerRef.value && carouselRef.value) {
        const infoHeight = infoContainerRef.value.offsetHeight;
        carouselRef.value.style.height = `${infoHeight}px`;
    }
};

onMounted(async () => {
    try {
        loading.value = true;
        const response = await axios.get(
            `http://localhost:3002/api/properties/${route.params.id}`,
        );
        propiedad.value = response.data;
        await nextTick(); // Esperar a que el DOM se actualice
        adjustCarouselHeight(); // Ajustar la altura del carrusel
    } catch (e) {
        error.value = e.response?.data?.message || e.message;
    } finally {
        loading.value = false;
    }
});

const saveChanges = async () => {
    try {
        loading.value = true;
        await axios.put(
            `http://localhost:3002/api/properties/${route.params.id}`,
            propiedad.value,
        );
        isEditing.value = false;
    } catch (e) {
        error.value = e.response?.data?.message || e.message;
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <ViewWrapper
        :title="propiedad?.titulo || 'Propiedad'"
        :subtitle="propiedad ? 'Detalles de la propiedad' : ''"
    >
        <template #actions>
            <div class="flex items-center gap-3">
                <button
                    @click="router.back()"
                    class="btn-secondary flex items-center gap-2"
                >
                    <ArrowLeftIcon class="h-5 w-5" />
                </button>
                <button
                    v-if="propiedad"
                    @click="isEditing = !isEditing"
                    class="btn-primary flex items-center gap-2"
                >
                    <PencilIcon class="h-5 w-5" />
                </button>
            </div>
        </template>

        <div class="mt-6">
            <!-- Loading State -->
            <div
                v-if="loading"
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-12"
            >
                <div class="flex flex-col items-center justify-center">
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
                    ></div>
                    <p class="mt-4 text-gray-500 dark:text-gray-400">
                        Cargando propiedad...
                    </p>
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="error"
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-12"
            >
                <div
                    class="flex flex-col items-center justify-center text-center"
                >
                    <ExclamationTriangleIcon
                        class="h-12 w-12 text-red-500 mb-4"
                    />
                    <h3
                        class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                    >
                        No se pudo cargar la propiedad
                    </h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-6">
                        {{ error }}
                    </p>
                    <button
                        @click="router.push('/propiedades')"
                        class="btn-primary"
                    >
                        Volver al listado
                    </button>
                </div>
            </div>

            <!-- Content State -->
            <div
                v-else-if="propiedad"
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Información básica -->
                    <div
                        ref="infoContainerRef"
                        class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                    >
                        <h3
                            class="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                        >
                            Información básica
                        </h3>
                        <div v-if="!isEditing" class="space-y-4">
                            <div class="flex items-center gap-2">
                                <HomeIcon class="h-6 w-6 text-blue-500" />
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Título:</strong>
                                    {{ propiedad.titulo }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <MapPinIcon class="h-6 w-6 text-blue-500" />
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Dirección:</strong>
                                    {{ propiedad.direccion }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <CurrencyDollarIcon
                                    class="h-6 w-6 text-blue-500"
                                />
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Precio:</strong> ${{
                                        propiedad.precio.toLocaleString()
                                    }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <UserIcon class="h-6 w-6 text-blue-500" />
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Propietario:</strong>
                                    {{ propiedad.propietario }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Tipo:</strong> {{ propiedad.tipo }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Descripción:</strong>
                                    {{ propiedad.descripcion }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Latitud:</strong>
                                    {{ propiedad.latitud }}
                                </p>
                            </div>
                            <div class="flex items-center gap-2">
                                <p class="text-gray-900 dark:text-gray-100">
                                    <strong>Longitud:</strong>
                                    {{ propiedad.longitud }}
                                </p>
                            </div>
                        </div>

                        <!-- Formulario de edición -->
                        <div v-else class="space-y-4">
                            <div class="flex items-center gap-2">
                                <HomeIcon class="h-6 w-6 text-blue-500" />
                                <input
                                    v-model="propiedad.titulo"
                                    class="input"
                                    placeholder="Título"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <MapPinIcon class="h-6 w-6 text-blue-500" />
                                <input
                                    v-model="propiedad.direccion"
                                    class="input"
                                    placeholder="Dirección"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <CurrencyDollarIcon
                                    class="h-6 w-6 text-blue-500"
                                />
                                <input
                                    v-model="propiedad.precio"
                                    type="number"
                                    class="input"
                                    placeholder="Precio"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <UserIcon class="h-6 w-6 text-blue-500" />
                                <input
                                    v-model="propiedad.propietario"
                                    class="input"
                                    placeholder="Propietario"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <input
                                    v-model="propiedad.tipo"
                                    class="input"
                                    placeholder="Tipo"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <textarea
                                    v-model="propiedad.descripcion"
                                    class="input"
                                    placeholder="Descripción"
                                ></textarea>
                            </div>
                            <div class="flex items-center gap-2">
                                <input
                                    v-model="propiedad.latitud"
                                    type="number"
                                    class="input"
                                    placeholder="Latitud"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <input
                                    v-model="propiedad.longitud"
                                    type="number"
                                    class="input"
                                    placeholder="Longitud"
                                />
                            </div>
                            <div class="flex justify-end gap-2">
                                <button
                                    @click="isEditing = false"
                                    class="btn-secondary"
                                >
                                    Cancelar
                                </button>
                                <button
                                    @click="saveChanges"
                                    class="btn-primary"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Carrusel de imágenes -->
                    <div
                        ref="carouselRef"
                        class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                    >
                        <Carousel
                            :autoplay="3000"
                            :loop="true"
                            :itemsToShow="1"
                            :navigationEnabled="true"
                            :paginationEnabled="true"
                            class="h-full"
                        >
                            <Slide
                                v-for="(url, index) in propiedad.imagenes_urls"
                                :key="index"
                            >
                                <img
                                    :src="getAbsoluteImageUrl(url)"
                                    class="w-full h-full object-cover rounded-lg aspect-video"
                                    alt="Imagen de la propiedad"
                                />
                            </Slide>
                            <template #addons>
                                <Pagination />
                                <Navigation />
                            </template>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </ViewWrapper>
</template>

<style scoped>
/* Estilos personalizados para darle un toque similar a Airbnb */
.aspect-video {
    aspect-ratio: 16 / 9;
}
.input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    color: #111827;
}
.input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
.btn-secondary {
    background-color: #e5e7eb;
    color: #111827;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-secondary:hover {
    background-color: #d1d5db;
}
.btn-primary {
    background-color: #3b82f6;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-primary:hover {
    background-color: #2563eb;
}
</style>
