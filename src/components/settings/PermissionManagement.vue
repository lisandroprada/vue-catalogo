<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Gestión de Permisos
            </h2>
            <button @click="showPermissionDrawer = true" class="btn-primary">
                Nuevo Permiso
            </button>
        </div>
        <div class="card-body">
            <PermissionsList
                @edit="handleEditPermission"
                @view="handleViewPermission"
            />
        </div>
        <PermissionDrawer
            v-model:show="showPermissionDrawer"
            :mode="drawerMode"
            :permission="selectedPermission"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import PermissionsList from "@/components/permissions/PermissionsList.vue";
import PermissionDrawer from "@/components/permissions/PermissionDrawer.vue";

const showPermissionDrawer = ref(false);
const drawerMode = ref("create");
const selectedPermission = ref(null);

const handleEditPermission = (permission) => {
    drawerMode.value = "edit";
    selectedPermission.value = permission;
    showPermissionDrawer.value = true;
};

const handleViewPermission = (permission) => {
    drawerMode.value = "view";
    selectedPermission.value = permission;
    showPermissionDrawer.value = true;
};
</script>
