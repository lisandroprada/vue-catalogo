<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Roles
            </h2>
            <button @click="showRoleDrawer = true" class="btn-primary">
                Nuevo Rol
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
                            Descripción
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
                    <tr v-for="role in roles" :key="role.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ role.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ role.description }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <button
                                @click="handleEditRole(role)"
                                class="text-blue-600 hover:text-blue-900"
                            >
                                Editar
                            </button>
                            <button
                                @click="handleDeleteRole(role.id)"
                                class="text-red-600 hover:text-red-900 ml-4"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
import RoleDrawer from "@/components/roles/RoleDrawer.vue";

const roles = ref([
    { id: 1, name: "Admin", description: "Acceso completo al sistema" },
    { id: 2, name: "Editor", description: "Puede editar contenido" },
]);

const showRoleDrawer = ref(false);
const drawerMode = ref("create");
const selectedRole = ref(null);

const handleEditRole = (role) => {
    drawerMode.value = "edit";
    selectedRole.value = role;
    showRoleDrawer.value = true;
};

const handleDeleteRole = (id) => {
    if (confirm("¿Está seguro de eliminar este rol?")) {
        roles.value = roles.value.filter((role) => role.id !== id);
    }
};
</script>
