<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Lista de Facturas</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Factura
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
                <tr v-for="factura in facturas" :key="factura.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ factura.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ factura.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ factura.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editFactura(factura)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteFactura(factura.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <FacturaForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveFactura"
            :factura="selectedFactura"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import FacturaForm from "./FacturaForm.vue";

const facturas = ref([
    { id: 1, fecha: "2023-01-01", descripcion: "Factura 001", monto: 500 },
    { id: 2, fecha: "2023-01-05", descripcion: "Factura 002", monto: 1000 },
]);

const showForm = ref(false);
const selectedFactura = ref(null);

const editFactura = (factura) => {
    selectedFactura.value = factura;
    showForm.value = true;
};

const deleteFactura = (id) => {
    facturas.value = facturas.value.filter((factura) => factura.id !== id);
};

const saveFactura = (factura) => {
    if (factura.id) {
        const index = facturas.value.findIndex((f) => f.id === factura.id);
        facturas.value[index] = factura;
    } else {
        factura.id = Date.now();
        facturas.value.push(factura);
    }
    showForm.value = false;
};
</script>
