<template>
    <div v-if="show" class="fixed inset-0 z-50 overflow-hidden">
        <div
            class="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            @click="close"
        ></div>
        <div class="absolute inset-y-0 right-0 max-w-full flex">
            <div class="w-screen max-w-md">
                <div
                    class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-scroll"
                >
                    <div class="px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <div class="flex items-start justify-between">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-gray-200"
                                id="slide-over-title"
                            >
                                Filtros
                            </h2>
                            <div class="ml-3 h-7 flex items-center">
                                <button
                                    @click="close"
                                    class="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span class="sr-only">Close panel</span>
                                    <XMarkIcon class="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="relative flex-1 py-6 px-4 sm:px-6">
                        <div class="space-y-6">
                            <div>
                                <label
                                    for="cliente"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Cliente</label
                                >
                                <input
                                    type="text"
                                    id="cliente"
                                    v-model="filters.cliente"
                                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                />
                            </div>
                            <div>
                                <label
                                    for="fecha"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Fecha</label
                                >
                                <input
                                    type="date"
                                    id="fecha"
                                    v-model="filters.fecha"
                                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                />
                            </div>
                            <div>
                                <label
                                    for="estado"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Estado</label
                                >
                                <select
                                    id="estado"
                                    v-model="filters.estado"
                                    class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                >
                                    <option value="">Todos</option>
                                    <option value="Por facturar">
                                        Por facturar
                                    </option>
                                    <option value="Facturado">Facturado</option>
                                    <option value="Anulado">Anulado</option>
                                    <option value="Pagada">Pagada</option>
                                    <option value="Pendiente">Pendiente</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-4 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <button
                            @click="applyFilters"
                            class="btn-primary w-full"
                        >
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    show: Boolean,
    modelValue: Boolean,
});

const emit = defineEmits(["update:show", "apply-filters"]);

const filters = ref({
    cliente: "",
    fecha: "",
    estado: "",
});

const close = () => {
    emit("update:show", false);
};

const applyFilters = () => {
    emit("apply-filters", filters.value);
    close();
};

watch(
    () => props.show,
    (newVal) => {
        if (newVal) {
            filters.value = {
                cliente: "",
                fecha: "",
                estado: "",
            };
        }
    },
);
</script>
