<script setup>
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(["update:show"]);

const filters = ref({
    cliente: "",
    tipoIncremento: "",
    fecha: "",
});

const handleApplyFilters = () => {
    // Lógica para aplicar filtros
    emit("update:show", false);
};

const handleClose = () => {
    emit("update:show", false);
};
</script>

<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-end"
    >
        <div class="bg-white w-96 p-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Filtros</h2>
                <button @click="handleClose" class="btn-icon">
                    <XMarkIcon class="h-6 w-6" />
                </button>
            </div>
            <form @submit.prevent="handleApplyFilters">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Cliente</label
                    >
                    <input
                        v-model="filters.cliente"
                        type="text"
                        class="input"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Tipo de Incremento</label
                    >
                    <input
                        v-model="filters.tipoIncremento"
                        type="text"
                        class="input"
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Fecha</label
                    >
                    <input v-model="filters.fecha" type="date" class="input" />
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="btn-primary">
                        Aplicar Filtros
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
