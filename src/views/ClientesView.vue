<template>
    <ViewWrapper title="Clientes" subtitle="Gestión de clientes y contactos">
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
                    @click="handleNewCliente"
                    class="btn-primary flex items-center gap-2"
                >
                    <PlusIcon class="h-4 w-4" />
                    Nuevo Cliente
                </button>
            </div>
        </template>

        <div class="flex">
            <!-- Drawer para filtros -->
            <div class="w-64 mr-4">
                <FilterDrawer v-model:show="showFilterDrawer" />
            </div>

            <!-- Lista principal -->
            <div class="flex-1 overflow-x-auto">
                <ClientesList
                    @edit="handleEditCliente"
                    @view="handleViewCliente"
                />
            </div>
        </div>

        <!-- Drawer para crear/editar cliente -->
        <ClienteDrawer
            v-model:show="showClienteDrawer"
            :mode="drawerMode"
            :cliente="selectedCliente"
        />
    </ViewWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import ClientesList from "@/components/clientes/ClientesList.vue";
import ClienteDrawer from "@/components/clientes/ClienteDrawer.vue";
import FilterDrawer from "@/components/clientes/FilterDrawer.vue";
import {
    PlusIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
} from "@heroicons/vue/24/outline";
import { useClientesStore } from "@/stores/clientesStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const clientesStore = useClientesStore();
const authStore = useAuthStore();
const router = useRouter();

const showClienteDrawer = ref(false);
const showFilterDrawer = ref(false);
const drawerMode = ref("create");
const selectedCliente = ref(null);

const handleNewCliente = () => {
    drawerMode.value = "create";
    selectedCliente.value = null;
    showClienteDrawer.value = true;
};

const handleEditCliente = (cliente) => {
    drawerMode.value = "edit";
    selectedCliente.value = cliente;
    showClienteDrawer.value = true;
};

const handleViewCliente = (cliente) => {
    drawerMode.value = "view";
    selectedCliente.value = cliente;
    showClienteDrawer.value = true;
};

const handleExportData = () => {
    // Implementar lógica de exportación
};

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        router.push({ name: "login" });
        return;
    }

    if (!authStore.hasAnyRole(["admin", "user"])) {
        router.push({ name: "access-denied" });
        return;
    }

    await clientesStore.fetchClientes();
});
</script>
