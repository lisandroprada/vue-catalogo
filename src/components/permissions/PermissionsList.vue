<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Permisos
            </h2>
            <button @click="showPermissionDrawer = true" class="btn-primary">
                Nuevo Permiso
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
                    <tr v-for="permission in permissions" :key="permission.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ permission.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ permission.description }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <button
                                @click="handleEditPermission(permission)"
                                class="text-blue-600 hover:text-blue-900"
                            >
                                Editar
                            </button>
                            <button
                                @click="handleDeletePermission(permission.id)"
                                class="text-red-600 hover:text-red-900 ml-4"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
import PermissionDrawer from "@/components/permissions/PermissionDrawer.vue";

const permissions = ref([
    {
        id: 1,
        name: "Ver Usuarios",
        description: "Permite ver la lista de usuarios",
    },
    { id: 2, name: "Editar Usuarios", description: "Permite editar usuarios" },
]);

const showPermissionDrawer = ref(false);
const drawerMode = ref("create");
const selectedPermission = ref(null);

const handleEditPermission = (permission) => {
    drawerMode.value = "edit";
    selectedPermission.value = permission;
    showPermissionDrawer.value = true;
};

const handleDeletePermission = (id) => {
    if (confirm("¿Está seguro de eliminar este permiso?")) {
        permissions.value = permissions.value.filter(
            (permission) => permission.id !== id,
        );
    }
};
</script>
