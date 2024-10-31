<template>
    <ViewWrapper title="Clientes" subtitle="Gestión de clientes y contactos">
        <template #actions>
            <div class="flex items-center gap-3">
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
            <!-- Lista principal -->
            <div class="flex-1 overflow-x-auto">
                <ClientesList
                    @edit="handleEditCliente"
                    @view="handleViewCliente"
                />
            </div>
        </div>
    </ViewWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import ClientesList from "@/components/clientes/ClientesList.vue";
import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import { useClientesStore } from "@/stores/clientesStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const clientesStore = useClientesStore();
const authStore = useAuthStore();
const router = useRouter();

const handleNewCliente = async () => {
    try {
        const uniqueId = await clientesStore.generateUniqueId();
        router.push({ name: "clientes-form", params: { id: uniqueId } });
    } catch (error) {
        console.error("Error generating unique ID:", error);
    }
};

const handleEditCliente = (cliente) => {
    router.push({ name: "clientes-form", params: { id: cliente._id } });
};

const handleViewCliente = (cliente) => {
    // Implementar lógica de visualización si es necesario
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
