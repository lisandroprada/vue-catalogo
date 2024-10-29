<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Lista de Ingresos</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Ingreso
        </button>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Fecha
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Descripción
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                        Monto
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
                <tr v-for="ingreso in ingresos" :key="ingreso.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ ingreso.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ ingreso.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ ingreso.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editIngreso(ingreso)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteIngreso(ingreso.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <IngresoForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveIngreso"
            :ingreso="selectedIngreso"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import IngresoForm from "./IngresoForm.vue";

const ingresos = ref([
    { id: 1, fecha: "2023-01-01", descripcion: "Pago de alquiler", monto: 500 },
    {
        id: 2,
        fecha: "2023-01-05",
        descripcion: "Venta de propiedad",
        monto: 1000,
    },
]);

const showForm = ref(false);
const selectedIngreso = ref(null);

const editIngreso = (ingreso) => {
    selectedIngreso.value = ingreso;
    showForm.value = true;
};

const deleteIngreso = (id) => {
    ingresos.value = ingresos.value.filter((ingreso) => ingreso.id !== id);
};

const saveIngreso = (ingreso) => {
    if (ingreso.id) {
        const index = ingresos.value.findIndex((i) => i.id === ingreso.id);
        ingresos.value[index] = ingreso;
    } else {
        ingreso.id = Date.now();
        ingresos.value.push(ingreso);
    }
    showForm.value = false;
};
</script>
