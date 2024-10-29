<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Lista de Proveedores</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Proveedor
        </button>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                        Empresa
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Email
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Teléfono
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
                <tr v-for="proveedor in proveedores" :key="proveedor.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ proveedor.nombre }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ proveedor.empresa }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ proveedor.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ proveedor.telefono }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="$emit('edit', proveedor)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="$emit('delete', proveedor.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useProveedoresStore } from "@/stores/proveedoresStore";

const proveedoresStore = useProveedoresStore();
const proveedores = ref(proveedoresStore.proveedores);
</script>
