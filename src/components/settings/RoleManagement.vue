<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Gestión de Roles
            </h2>
            <BriefcaseIcon class="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </div>
        <div class="card-body">
            <RolesList @edit="handleEditRole" @view="handleViewRole" />
        </div>
        <RoleDrawer
            v-model:show="showRoleDrawer"
            :mode="drawerMode"
            :role="selectedRole"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import RolesList from "@/components/roles/RolesList.vue";
import RoleDrawer from "@/components/roles/RoleDrawer.vue";
import { BriefcaseIcon } from "@heroicons/vue/24/outline";

const showRoleDrawer = ref(false);
const drawerMode = ref("create");
const selectedRole = ref(null);

const handleEditRole = (role) => {
    drawerMode.value = "edit";
    selectedRole.value = role;
    showRoleDrawer.value = true;
};

const handleViewRole = (role) => {
    drawerMode.value = "view";
    selectedRole.value = role;
    showRoleDrawer.value = true;
};
</script>
