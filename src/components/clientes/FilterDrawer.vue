<script setup>
import { ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useClientesStore } from "@/stores/clientesStore";

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(["update:show"]);

const clientesStore = useClientesStore();
const filters = ref({
    search: "",
    estado: "",
    empresa: "",
    fechaDesde: "",
    fechaHasta: "",
});

const handleApplyFilters = () => {
    clientesStore.setFilters(filters.value);
    emit("update:show", false);
};

const handleResetFilters = () => {
    filters.value = {
        search: "",
        estado: "",
        empresa: "",
        fechaDesde: "",
        fechaHasta: "",
    };
    clientesStore.resetFilters();
    emit("update:show", false);
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 overflow-hidden z-50">
        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="emit('update:show', false)"
        />

        <!-- Drawer -->
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
                                @click="emit('update:show', false)"
                                class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
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
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Búsqueda
                                </label>
                                <input
                                    v-model="filters.search"
                                    type="text"
                                    placeholder="Buscar por nombre, email..."
                                    class="input mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Estado
                                </label>
                                <select
                                    v-model="filters.estado"
                                    class="input mt-1"
                                >
                                    <option value="">Todos</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Empresa
                                </label>
                                <input
                                    v-model="filters.empresa"
                                    type="text"
                                    placeholder="Filtrar por empresa"
                                    class="input mt-1"
                                />
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Fecha desde
                                    </label>
                                    <input
                                        v-model="filters.fechaDesde"
                                        type="date"
                                        class="input mt-1"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Fecha hasta
                                    </label>
                                    <input
                                        v-model="filters.fechaHasta"
                                        type="date"
                                        class="input mt-1"
                                    />
                                </div>
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
