<script setup>
import { shallowRef } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import ContratosList from "@/components/contratos/ContratosList.vue";
import ContratoDrawer from "@/components/contratos/ContratoDrawer.vue";
import FilterDrawer from "@/components/contratos/FilterDrawer.vue";
import ContratosDashboard from "@/components/contratos/ContratosDashboard.vue";
import {
    PlusIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
    ChartBarIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";

const showContratoDrawer = shallowRef(false);
const showFilterDrawer = shallowRef(false);
const drawerMode = shallowRef("create"); // 'create' | 'edit' | 'view'
const selectedContrato = shallowRef(null);

const handleNewContrato = () => {
    drawerMode.value = "create";
    selectedContrato.value = null;
    showContratoDrawer.value = true;
};

const handleEditContrato = (contrato) => {
    drawerMode.value = "edit";
    selectedContrato.value = contrato;
    showContratoDrawer.value = true;
};

const handleViewContrato = (contrato) => {
    drawerMode.value = "view";
    selectedContrato.value = contrato;
    showContratoDrawer.value = true;
};

const handleExportData = () => {
    // Lógica para exportar datos
};

const tabs = shallowRef([
    { name: "Dashboard", icon: ChartBarIcon, component: ContratosDashboard },
    {
        name: "Lista de Contratos",
        icon: ClipboardDocumentListIcon,
        component: ContratosList,
    },
]);

const activeTab = shallowRef(tabs.value[0]);
</script>

<template>
    <ViewWrapper title="Contratos" subtitle="Gestión de contratos vigentes">
        <template #actions>
            <div class="flex items-center gap-3">
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
                <button
                    @click="handleNewContrato"
                    class="btn-primary flex items-center gap-2"
                >
                    <PlusIcon class="h-4 w-4" />
                    Nuevo Contrato
                </button>
            </div>
        </template>

        <div class="tabs">
            <nav class="flex space-x-4" aria-label="Tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.name"
                    @click="activeTab = tab"
                    :class="[
                        activeTab.name === tab.name
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <component :is="tab.icon" class="h-5 w-5" />
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <div class="mt-6">
            <component
                :is="activeTab.component"
                @edit="handleEditContrato"
                @view="handleViewContrato"
            />
        </div>

        <!-- Drawer para crear/editar contrato -->
        <ContratoDrawer
            v-model:show="showContratoDrawer"
            :mode="drawerMode"
            :contrato="selectedContrato"
        />

        <!-- Drawer para filtros -->
        <FilterDrawer v-model:show="showFilterDrawer" />
    </ViewWrapper>
</template>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
