<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Gestión de Usuarios
            </h2>
            <button @click="showUserDrawer = true" class="btn-primary">
                Nuevo Usuario
            </button>
        </div>
        <div class="card-body">
            <UsersList @edit="handleEditUser" @view="handleViewUser" />
        </div>
        <UserDrawer
            v-model:show="showUserDrawer"
            :mode="drawerMode"
            :user="selectedUser"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import UsersList from "@/components/users/UsersList.vue";
import UserDrawer from "@/components/users/UserDrawer.vue";

const showUserDrawer = ref(false);
const drawerMode = ref("create");
const selectedUser = ref(null);

const handleEditUser = (user) => {
    drawerMode.value = "edit";
    selectedUser.value = user;
    showUserDrawer.value = true;
};

const handleViewUser = (user) => {
    drawerMode.value = "view";
    selectedUser.value = user;
    showUserDrawer.value = true;
};
</script>
