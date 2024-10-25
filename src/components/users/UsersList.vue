<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Usuarios
            </h2>
            <button @click="showUserDrawer = true" class="btn-primary">
                Nuevo Usuario
            </button>
        </div>
        <div class="card-body">
            <table
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Nombre
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Email
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Rol
                        </th>
                        <th
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody
                    class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                >
                    <tr v-for="user in users" :key="user.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ user.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ user.email }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ user.role }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <button
                                @click="handleEditUser(user)"
                                class="text-blue-600 hover:text-blue-900"
                            >
                                Editar
                            </button>
                            <button
                                @click="handleDeleteUser(user.id)"
                                class="text-red-600 hover:text-red-900 ml-4"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
import UserDrawer from "@/components/users/UserDrawer.vue";

const users = ref([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
]);

const showUserDrawer = ref(false);
const drawerMode = ref("create");
const selectedUser = ref(null);

const handleEditUser = (user) => {
    drawerMode.value = "edit";
    selectedUser.value = user;
    showUserDrawer.value = true;
};

const handleDeleteUser = (id) => {
    if (confirm("¿Está seguro de eliminar este usuario?")) {
        users.value = users.value.filter((user) => user.id !== id);
    }
};
</script>
