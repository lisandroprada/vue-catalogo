<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import CRMCaseList from "@/components/crm/CRMCaseList.vue";
import CRMCaseDrawer from "@/components/crm/CRMCaseDrawer.vue";
import { ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { useCRMStore } from "@/stores/crmStore";

const crmStore = useCRMStore();

const showCaseDrawer = ref(false);
const drawerMode = ref("create"); // 'create' | 'edit' | 'view'
const selectedCase = ref(null);

const handleNewCase = () => {
    drawerMode.value = "create";
    selectedCase.value = null;
    showCaseDrawer.value = true;
};

const handleEditCase = (crmCase) => {
    drawerMode.value = "edit";
    selectedCase.value = crmCase;
    showCaseDrawer.value = true;
};

const handleViewCase = (crmCase) => {
    drawerMode.value = "view";
    selectedCase.value = crmCase;
    showCaseDrawer.value = true;
};

const handleDeleteCase = async (crmCase) => {
    await crmStore.deleteCase(crmCase.id);
};
</script>

<template>
    <ViewWrapper title="CRM" subtitle="Gestión de relaciones con clientes">
        <template #actions>
            <button
                @click="handleNewCase"
                class="btn-primary flex items-center gap-2"
            >
                <PlusIcon class="h-5 w-5" />
                Nuevo Caso
            </button>
        </template>

        <!-- Lista de Casos -->
        <CRMCaseList
            @edit="handleEditCase"
            @view="handleViewCase"
            @delete="handleDeleteCase"
        />

        <!-- Drawer para crear/editar/ver caso -->
        <CRMCaseDrawer
            v-model:show="showCaseDrawer"
            :mode="drawerMode"
            :crmCase="selectedCase"
        />
    </ViewWrapper>
</template>
