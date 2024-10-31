<template>
    <ViewWrapper
        title="Proveedores"
        subtitle="Gestión de proveedores y sus transacciones"
    >
        <div class="mt-6">
            <div class="tabs">
                <nav class="flex space-x-4" aria-label="Tabs">
                    <button
                        @click="activeTab = 'proveedores'"
                        :class="[
                            activeTab === 'proveedores'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                        ]"
                    >
                        <UserGroupIcon class="h-5 w-5" />
                        Proveedores
                    </button>
                    <button
                        @click="activeTab = 'comprobantes'"
                        :class="[
                            activeTab === 'comprobantes'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                        ]"
                    >
                        <DocumentTextIcon class="h-5 w-5" />
                        Comprobantes
                    </button>
                    <button
                        @click="activeTab = 'deudasPagos'"
                        :class="[
                            activeTab === 'deudasPagos'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                        ]"
                    >
                        <CurrencyDollarIcon class="h-5 w-5" />
                        Deudas y Pagos
                    </button>
                    <button
                        @click="activeTab = 'facturas'"
                        :class="[
                            activeTab === 'facturas'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                        ]"
                    >
                        <DocumentTextIcon class="h-5 w-5" />
                        Facturas
                    </button>
                    <button
                        @click="activeTab = 'ingresosEgresos'"
                        :class="[
                            activeTab === 'ingresosEgresos'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                        ]"
                    >
                        <CurrencyDollarIcon class="h-5 w-5" />
                        Ingresos y Egresos
                    </button>
                </nav>
            </div>

            <div class="tab-content mt-6">
                <div v-if="activeTab === 'proveedores'">
                    <button
                        @click="handleNewProveedor"
                        class="btn-primary flex items-center gap-2 mb-4"
                    >
                        <PlusIcon class="h-5 w-5" />
                        Nuevo Proveedor
                    </button>
                    <ProveedoresList
                        @edit="handleEditProveedor"
                        @view="handleViewProveedor"
                        @delete="handleDeleteProveedor"
                    />
                </div>
                <div v-if="activeTab === 'comprobantes'">
                    <button
                        @click="handleNewComprobante"
                        class="btn-primary flex items-center gap-2 mb-4"
                    >
                        <PlusIcon class="h-5 w-5" />
                        Nuevo Comprobante
                    </button>
                    <ComprobantesList />
                </div>
                <div v-if="activeTab === 'deudasPagos'">
                    <button
                        @click="handleNewDeudaPago"
                        class="btn-primary flex items-center gap-2 mb-4"
                    >
                        <PlusIcon class="h-5 w-5" />
                        Nueva Deuda/Pago
                    </button>
                    <DeudasPagosList />
                </div>
                <div v-if="activeTab === 'facturas'">
                    <button
                        @click="handleNewFactura"
                        class="btn-primary flex items-center gap-2 mb-4"
                    >
                        <PlusIcon class="h-5 w-5" />
                        Nueva Factura
                    </button>
                    <FacturasList />
                </div>
                <div v-if="activeTab === 'ingresosEgresos'">
                    <button
                        @click="handleNewIngresoEgreso"
                        class="btn-primary flex items-center gap-2 mb-4"
                    >
                        <PlusIcon class="h-5 w-5" />
                        Nuevo Movimiento
                    </button>
                    <IngresosEgresosList />
                </div>
            </div>
        </div>

        <ProveedorDrawer
            v-model:show="showProveedorDrawer"
            :mode="drawerMode"
            :proveedor="selectedProveedor"
            @update:show="showProveedorDrawer = false"
        />
        <ComprobanteForm
            v-if="showComprobanteForm"
            @close="showComprobanteForm = false"
            @save="saveComprobante"
        />
        <DeudaPagoForm
            v-if="showDeudaPagoForm"
            @close="showDeudaPagoForm = false"
            @save="saveDeudaPago"
        />
        <FacturaForm
            v-if="showFacturaForm"
            @close="showFacturaForm = false"
            @save="saveFactura"
        />
        <MovimientoForm
            v-if="showMovimientoForm"
            @close="showMovimientoForm = false"
            @save="saveMovimiento"
        />
    </ViewWrapper>
</template>

<script setup>
import { ref } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import ProveedoresList from "@/components/proveedores/ProveedoresList.vue";
import ComprobantesList from "@/components/proveedores/ComprobantesList.vue";
import DeudasPagosList from "@/components/proveedores/DeudasPagosList.vue";
import FacturasList from "@/components/proveedores/FacturasList.vue";
import IngresosEgresosList from "@/components/proveedores/IngresosEgresosList.vue";
import ProveedorDrawer from "@/components/proveedores/ProveedorDrawer.vue";
import ComprobanteForm from "@/components/proveedores/ComprobanteForm.vue";
import DeudaPagoForm from "@/components/proveedores/DeudaPagoForm.vue";
import FacturaForm from "@/components/proveedores/FacturaForm.vue";
import MovimientoForm from "@/components/proveedores/MovimientoForm.vue";
import {
    PlusIcon,
    UserGroupIcon,
    DocumentTextIcon,
    CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
import { useProveedoresStore } from "@/stores/proveedoresStore";

const proveedoresStore = useProveedoresStore();
proveedoresStore.fetchProveedores();

const showProveedorDrawer = ref(false);
const showComprobanteForm = ref(false);
const showDeudaPagoForm = ref(false);
const showFacturaForm = ref(false);
const showMovimientoForm = ref(false);
const drawerMode = ref("create");
const selectedProveedor = ref(null);
const activeTab = ref("proveedores");

const handleNewProveedor = () => {
    drawerMode.value = "create";
    selectedProveedor.value = null;
    showProveedorDrawer.value = true;
};

const handleEditProveedor = (proveedor) => {
    drawerMode.value = "edit";
    selectedProveedor.value = proveedor;
    showProveedorDrawer.value = true;
};

const handleViewProveedor = (proveedor) => {
    drawerMode.value = "view";
    selectedProveedor.value = proveedor;
    showProveedorDrawer.value = true;
};

const handleDeleteProveedor = async (id) => {
    if (confirm("¿Está seguro de eliminar este proveedor?")) {
        await proveedoresStore.deleteProveedor(id);
    }
};

const handleNewComprobante = () => {
    showComprobanteForm.value = true;
};

const saveComprobante = (comprobante) => {
    // Lógica para guardar comprobante
    showComprobanteForm.value = false;
};

const handleNewDeudaPago = () => {
    showDeudaPagoForm.value = true;
};

const saveDeudaPago = (deudaPago) => {
    // Lógica para guardar deuda/pago
    showDeudaPagoForm.value = false;
};

const handleNewFactura = () => {
    showFacturaForm.value = true;
};

const saveFactura = (factura) => {
    // Lógica para guardar factura
    showFacturaForm.value = false;
};

const handleNewIngresoEgreso = () => {
    showMovimientoForm.value = true;
};

const saveMovimiento = (movimiento) => {
    // Lógica para guardar movimiento
    showMovimientoForm.value = false;
};
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
