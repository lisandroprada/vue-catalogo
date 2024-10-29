<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Comprobantes</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Comprobante
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
                <tr v-for="comprobante in comprobantes" :key="comprobante.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ comprobante.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ comprobante.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ comprobante.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editComprobante(comprobante)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteComprobante(comprobante.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <ComprobanteForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveComprobante"
            :comprobante="selectedComprobante"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import ComprobanteForm from "./ComprobanteForm.vue";

const comprobantes = ref([
    { id: 1, fecha: "2023-01-01", descripcion: "Factura 001", monto: 500 },
    { id: 2, fecha: "2023-01-05", descripcion: "Factura 002", monto: 1000 },
]);

const showForm = ref(false);
const selectedComprobante = ref(null);

const editComprobante = (comprobante) => {
    selectedComprobante.value = comprobante;
    showForm.value = true;
};

const deleteComprobante = (id) => {
    comprobantes.value = comprobantes.value.filter(
        (comprobante) => comprobante.id !== id,
    );
};

const saveComprobante = (comprobante) => {
    if (comprobante.id) {
        const index = comprobantes.value.findIndex(
            (c) => c.id === comprobante.id,
        );
        comprobantes.value[index] = comprobante;
    } else {
        comprobante.id = Date.now();
        comprobantes.value.push(comprobante);
    }
    showForm.value = false;
};
</script>
