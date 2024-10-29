<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Conciliación Bancaria</h2>
        <button @click="importarExtracto" class="btn-primary mb-4">
            Importar Extracto Bancario
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
                        Estado
                    </th>
                </tr>
            </thead>
            <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
                <tr v-for="transaccion in transacciones" :key="transaccion.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ transaccion.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ transaccion.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ transaccion.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span
                            :class="
                                transaccion.estado === 'conciliado'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            "
                        >
                            {{ transaccion.estado }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from "vue";

const transacciones = ref([
    {
        id: 1,
        fecha: "2023-01-01",
        descripcion: "Pago de alquiler",
        monto: 500,
        estado: "conciliado",
    },
    {
        id: 2,
        fecha: "2023-01-05",
        descripcion: "Venta de propiedad",
        monto: 1000,
        estado: "pendiente",
    },
]);

const importarExtracto = () => {
    // Lógica para importar extracto bancario
    alert("Importar extracto bancario");
};
</script>
