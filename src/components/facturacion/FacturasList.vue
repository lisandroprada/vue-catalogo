<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Listado de Facturas</h2>
        <div class="flex justify-between mb-4">
            <button
                @click="showFilterDrawer = true"
                class="btn-secondary flex items-center gap-2"
            >
                <FunnelIcon class="h-4 w-4" />
                Filtros
            </button>
            <button
                @click="handleExportData"
                class="btn-secondary flex items-center gap-2"
            >
                <ArrowDownTrayIcon class="h-4 w-4" />
                Exportar
            </button>
        </div>
        <table
            class="min-w-full bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
        >
            <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th
                        class="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        class="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Cliente
                    </th>
                    <th
                        class="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Fecha
                    </th>
                    <th
                        class="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Monto
                    </th>
                    <th
                        class="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Estado
                    </th>
                </tr>
            </thead>
            <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
                <tr v-for="factura in facturas" :key="factura.id">
                    <td class="py-2 px-4">{{ factura.id }}</td>
                    <td class="py-2 px-4">{{ factura.cliente }}</td>
                    <td class="py-2 px-4">{{ factura.fecha }}</td>
                    <td class="py-2 px-4">{{ factura.monto }}</td>
                    <td class="py-2 px-4">{{ factura.estado }}</td>
                </tr>
            </tbody>
        </table>
        <FilterDrawer v-model:show="showFilterDrawer" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import FilterDrawer from "@/components/facturacion/FilterDrawer.vue";
import { FunnelIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/outline";

const showFilterDrawer = ref(false);

const facturas = ref([
    {
        id: 1,
        cliente: "Cliente 1",
        fecha: "2023-01-01",
        monto: 1000,
        estado: "Pagada",
    },
    {
        id: 2,
        cliente: "Cliente 2",
        fecha: "2023-01-02",
        monto: 2000,
        estado: "Pendiente",
    },
    {
        id: 3,
        cliente: "Cliente 3",
        fecha: "2023-01-03",
        monto: 1500,
        estado: "Anulada",
    },
]);

const handleExportData = () => {
    // Lógica para exportar datos
};
</script>
