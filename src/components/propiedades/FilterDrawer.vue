<script setup>
import { ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    show: Boolean,
    filters: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["update:show", "apply-filters"]);

const localFilters = ref({ ...props.filters });

const propertyTypes = ["Todos", "Casa", "Apartamento", "Duplex", "PH", "Local"];

const statusTypes = ["Todos", "Venta", "Alquiler", "Alquiler Temporal"];

const handleApplyFilters = () => {
    emit("apply-filters", localFilters.value);
    emit("update:show", false);
};

const handleResetFilters = () => {
    localFilters.value = {
        type: "",
        priceMin: "",
        priceMax: "",
        beds: "",
        status: "",
    };
    emit("apply-filters", localFilters.value);
    emit("update:show", false);
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 overflow-hidden z-50">
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="$emit('update:show', false)"
        />

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="w-screen max-w-md">
                <div
                    class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl"
                >
                    <!-- Header -->
                    <div class="px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <div class="flex items-center justify-between">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                Filtros
                            </h2>
                            <button
                                @click="$emit('update:show', false)"
                                class="rounded-md text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon class="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <!-- Filtros -->
                    <div
                        class="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto"
                    >
                        <div class="space-y-6">
                            <!-- Tipo de Propiedad -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Tipo de Propiedad
                                </label>
                                <select
                                    v-model="localFilters.type"
                                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                >
                                    <option
                                        v-for="type in propertyTypes"
                                        :key="type"
                                        :value="type"
                                    >
                                        {{ type }}
                                    </option>
                                </select>
                            </div>

                            <!-- Rango de Precio -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Rango de Precio
                                </label>
                                <div class="mt-1 grid grid-cols-2 gap-4">
                                    <input
                                        v-model="localFilters.priceMin"
                                        type="number"
                                        placeholder="Mínimo"
                                        class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                    />
                                    <input
                                        v-model="localFilters.priceMax"
                                        type="number"
                                        placeholder="Máximo"
                                        class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <!-- Habitaciones -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Habitaciones
                                </label>
                                <select
                                    v-model="localFilters.beds"
                                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="">Cualquiera</option>
                                    <option v-for="n in 5" :key="n" :value="n">
                                        {{ n }}+
                                    </option>
                                </select>
                            </div>

                            <!-- Estado -->
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Estado
                                </label>
                                <select
                                    v-model="localFilters.status"
                                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                >
                                    <option
                                        v-for="status in statusTypes"
                                        :key="status"
                                        :value="status"
                                    >
                                        {{ status }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div
                        class="flex-shrink-0 px-4 py-4 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900"
                    >
                        <button
                            type="button"
                            class="btn-secondary"
                            @click="handleResetFilters"
                        >
                            Limpiar
                        </button>
                        <button
                            type="button"
                            class="btn-primary"
                            @click="handleApplyFilters"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
