<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Lista de Bancos</h2>
        <button @click="showForm = true" class="btn-primary mb-4">
            Agregar Banco
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
                        Número de Cuenta
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
                <tr v-for="banco in bancos" :key="banco.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ banco.nombre }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        {{ banco.numeroCuenta }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button
                            @click="editBanco(banco)"
                            class="text-blue-600 hover:text-blue-900"
                        >
                            Editar
                        </button>
                        <button
                            @click="deleteBanco(banco.id)"
                            class="text-red-600 hover:text-red-900 ml-4"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <BancoForm
            v-if="showForm"
            @close="showForm = false"
            @save="saveBanco"
            :banco="selectedBanco"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import BancoForm from "./BancoForm.vue";

const bancos = ref([
    { id: 1, nombre: "Banco 1", numeroCuenta: "1234567890" },
    { id: 2, nombre: "Banco 2", numeroCuenta: "0987654321" },
]);

const showForm = ref(false);
const selectedBanco = ref(null);

const editBanco = (banco) => {
    selectedBanco.value = banco;
    showForm.value = true;
};

const deleteBanco = (id) => {
    bancos.value = bancos.value.filter((banco) => banco.id !== id);
};

const saveBanco = (banco) => {
    if (banco.id) {
        const index = bancos.value.findIndex((b) => b.id === banco.id);
        bancos.value[index] = banco;
    } else {
        banco.id = Date.now();
        bancos.value.push(banco);
    }
    showForm.value = false;
};
</script>
