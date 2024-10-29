<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Deudas y Pagos</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Deuda/Pago
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
                <tr v-for="deudaPago in deudasPagos" :key="deudaPago.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ deudaPago.fecha }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ deudaPago.descripcion }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ deudaPago.monto }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ deudaPago.tipo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editDeudaPago(deudaPago)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteDeudaPago(deudaPago.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <DeudaPagoForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveDeudaPago"
            :deudaPago="selectedDeudaPago"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import DeudaPagoForm from "./DeudaPagoForm.vue";

const deudasPagos = ref([
    {
        id: 1,
        fecha: "2023-01-01",
        descripcion: "Pago de deuda",
        monto: 500,
        tipo: "Pago",
    },
    {
        id: 2,
        fecha: "2023-01-05",
        descripcion: "Nueva deuda",
        monto: 1000,
        tipo: "Deuda",
    },
]);

const showForm = ref(false);
const selectedDeudaPago = ref(null);

const editDeudaPago = (deudaPago) => {
    selectedDeudaPago.value = deudaPago;
    showForm.value = true;
};

const deleteDeudaPago = (id) => {
    deudasPagos.value = deudasPagos.value.filter(
        (deudaPago) => deudaPago.id !== id,
    );
};

const saveDeudaPago = (deudaPago) => {
    if (deudaPago.id) {
        const index = deudasPagos.value.findIndex((d) => d.id === deudaPago.id);
        deudasPagos.value[index] = deudaPago;
    } else {
        deudaPago.id = Date.now();
        deudasPagos.value.push(deudaPago);
    }
    showForm.value = false;
};
</script>
