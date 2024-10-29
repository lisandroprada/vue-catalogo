<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Ingresos y Egresos</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Movimiento
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
                        Tipo
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
                <tr v-for="movimiento in movimientos" :key="movimiento.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ movimiento.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ movimiento.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ movimiento.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ movimiento.tipo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editMovimiento(movimiento)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteMovimiento(movimiento.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <MovimientoForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveMovimiento"
            :movimiento="selectedMovimiento"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import MovimientoForm from "./MovimientoForm.vue";

const movimientos = ref([
    {
        id: 1,
        fecha: "2023-01-01",
        descripcion: "Pago de factura",
        monto: 500,
        tipo: "Egreso",
    },
    {
        id: 2,
        fecha: "2023-01-05",
        descripcion: "Reembolso",
        monto: 100,
        tipo: "Ingreso",
    },
]);

const showForm = ref(false);
const selectedMovimiento = ref(null);

const editMovimiento = (movimiento) => {
    selectedMovimiento.value = movimiento;
    showForm.value = true;
};

const deleteMovimiento = (id) => {
    movimientos.value = movimientos.value.filter(
        (movimiento) => movimiento.id !== id,
    );
};

const saveMovimiento = (movimiento) => {
    if (movimiento.id) {
        const index = movimientos.value.findIndex(
            (m) => m.id === movimiento.id,
        );
        movimientos.value[index] = movimiento;
    } else {
        movimiento.id = Date.now();
        movimientos.value.push(movimiento);
    }
    showForm.value = false;
};
</script>
