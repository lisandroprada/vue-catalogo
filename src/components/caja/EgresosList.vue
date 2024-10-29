<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Lista de Egresos</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Egreso
        </button>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Fecha
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Descripción
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Monto
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
                <tr v-for="egreso in egresos" :key="egreso.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ egreso.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ egreso.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ egreso.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editEgreso(egreso)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteEgreso(egreso.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <EgresoForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveEgreso"
            :egreso="selectedEgreso"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import EgresoForm from "./EgresoForm.vue";

const egresos = ref([
    {
        id: 1,
        fecha: "2023-01-02",
        descripcion: "Pago de servicios",
        monto: 200,
    },
    { id: 2, fecha: "2023-01-10", descripcion: "Mantenimiento", monto: 300 },
]);

const showForm = ref(false);
const selectedEgreso = ref(null);

const editEgreso = (egreso) => {
    selectedEgreso.value = egreso;
    showForm.value = true;
};

const deleteEgreso = (id) => {
    egresos.value = egresos.value.filter((egreso) => egreso.id !== id);
};

const saveEgreso = (egreso) => {
    if (egreso.id) {
        const index = egresos.value.findIndex((e) => e.id === egreso.id);
        egresos.value[index] = egreso;
    } else {
        egreso.id = Date.now();
        egresos.value.push(egreso);
    }
    showForm.value = false;
};
</script>
