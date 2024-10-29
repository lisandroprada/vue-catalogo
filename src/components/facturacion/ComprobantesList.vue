<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Listado de Comprobantes</h2>
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
                        Estado
                    </th>
                    <th
                        class="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody
                class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
                <tr v-for="comprobante in comprobantes" :key="comprobante.id">
                    <td class="py-2 px-4">{{ comprobante.id }}</td>
                    <td class="py-2 px-4">{{ comprobante.cliente }}</td>
                    <td class="py-2 px-4">{{ comprobante.fecha }}</td>
                    <td class="py-2 px-4">{{ comprobante.estado }}</td>
                    <td class="py-2 px-4">
                        <button
                            @click="openFacturaModal(comprobante)"
                            v-if="comprobante.estado === 'Por facturar'"
                            class="btn-primary"
                        >
                            Facturar
                        </button>
                        <button
                            @click="anular(comprobante)"
                            v-if="comprobante.estado !== 'Anulado'"
                            class="btn-secondary"
                        >
                            Anular
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <FilterDrawer v-model:show="showFilterDrawer" />
        <FacturaModal
            v-model:show="showFacturaModal"
            :factura="selectedFactura"
            @save="handleSaveFactura"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import FilterDrawer from "@/components/facturacion/FilterDrawer.vue";
import FacturaModal from "@/components/facturacion/FacturaModal.vue";
import { FunnelIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/outline";

const showFilterDrawer = ref(false);
const showFacturaModal = ref(false);
const selectedFactura = ref(null);

const comprobantes = ref([
    {
        id: 1,
        cliente: "Cliente 1",
        fecha: "2023-01-01",
        estado: "Por facturar",
        cuit: "20-12345678-9",
        nombre: "Cliente 1",
        domicilio: "Calle Falsa 123",
        localidad: "Ciudad",
        provincia: "Provincia",
        codigoPostal: "1234",
        telefono: "123456789",
        email: "cliente1@example.com",
        fechaEmision: "2023-01-01",
        fechaVencimiento: "2023-01-10",
        fechaPago: "",
        montoTotal: 1000,
        montoPagado: 0,
        montoPendiente: 1000,
    },
    {
        id: 2,
        cliente: "Cliente 2",
        fecha: "2023-01-02",
        estado: "Facturado",
        cuit: "20-87654321-0",
        nombre: "Cliente 2",
        domicilio: "Calle Verdadera 456",
        localidad: "Ciudad",
        provincia: "Provincia",
        codigoPostal: "5678",
        telefono: "987654321",
        email: "cliente2@example.com",
        fechaEmision: "2023-01-02",
        fechaVencimiento: "2023-01-12",
        fechaPago: "2023-01-05",
        montoTotal: 2000,
        montoPagado: 2000,
        montoPendiente: 0,
    },
    {
        id: 3,
        cliente: "Cliente 3",
        fecha: "2023-01-03",
        estado: "Anulado",
        cuit: "20-11223344-5",
        nombre: "Cliente 3",
        domicilio: "Calle Real 789",
        localidad: "Ciudad",
        provincia: "Provincia",
        codigoPostal: "9101",
        telefono: "1122334455",
        email: "cliente3@example.com",
        fechaEmision: "2023-01-03",
        fechaVencimiento: "2023-01-13",
        fechaPago: "",
        montoTotal: 1500,
        montoPagado: 0,
        montoPendiente: 1500,
    },
]);

const openFacturaModal = (comprobante) => {
    selectedFactura.value = { ...comprobante };
    showFacturaModal.value = true;
};

const anular = (comprobante) => {
    // Lógica para anular el comprobante
    alert(`Anulando comprobante ${comprobante.id}`);
};

const handleSaveFactura = (factura) => {
    // Lógica para guardar los cambios de la factura
    alert(`Guardando cambios para la factura ${factura.id}`);
};

const handleExportData = () => {
    // Lógica para exportar datos
};
</script>
