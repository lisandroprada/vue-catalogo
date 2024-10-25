<script setup>
import { ref, computed, watch } from "vue";
import { useClientesStore } from "@/stores/clientesStore";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    PencilIcon,
    EyeIcon,
    TrashIcon,
} from "@heroicons/vue/24/outline";

const emit = defineEmits(["edit", "view"]);
const clientesStore = useClientesStore();

const sortBy = ref("nombre");
const sortDesc = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "empresa", label: "Empresa" },
    { key: "email", label: "Email" },
    { key: "telefono", label: "Teléfono" },
    { key: "estado", label: "Estado" },
    { key: "actions", label: "Acciones" },
];

const sortedClientes = computed(() => {
    return [...clientesStore.clientes].sort((a, b) => {
        const modifier = sortDesc.value ? -1 : 1;
        return a[sortBy.value] > b[sortBy.value] ? modifier : -modifier;
    });
});

const paginatedClientes = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedClientes.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(sortedClientes.value.length / itemsPerPage.value);
});

const handleSort = (column) => {
    if (sortBy.value === column) {
        sortDesc.value = !sortDesc.value;
    } else {
        sortBy.value = column;
        sortDesc.value = false;
    }
};

const handleDelete = async (cliente) => {
    if (confirm("¿Está seguro de eliminar este cliente?")) {
        await clientesStore.deleteCliente(cliente.id);
    }
};
</script>

<template>
    <div class="card mt-6">
        <!-- Table -->
        <div class="overflow-x-auto">
            <table
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            v-for="column in columns"
                            :key="column.key"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                            @click="handleSort(column.key)"
                        >
                            <div class="flex items-center gap-2">
                                {{ column.label }}
                                <div
                                    v-if="column.key !== 'actions'"
                                    class="flex flex-col"
                                >
                                    <ChevronUpIcon
                                        class="h-3 w-3"
                                        :class="{
                                            'text-blue-500':
                                                sortBy === column.key &&
                                                !sortDesc,
                                        }"
                                    />
                                    <ChevronDownIcon
                                        class="h-3 w-3"
                                        :class="{
                                            'text-blue-500':
                                                sortBy === column.key &&
                                                sortDesc,
                                        }"
                                    />
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody
                    class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                >
                    <tr
                        v-for="cliente in paginatedClientes"
                        :key="cliente.id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ cliente.nombre }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ cliente.empresa }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ cliente.email }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ cliente.telefono }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                :class="[
                                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                    cliente.estado === 'Activo'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                                ]"
                            >
                                {{ cliente.estado }}
                            </span>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <div class="flex items-center gap-2 justify-end">
                                <button
                                    @click="emit('view', cliente)"
                                    class="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <EyeIcon class="h-5 w-5" />
                                </button>
                                <button
                                    @click="emit('edit', cliente)"
                                    class="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <PencilIcon class="h-5 w-5" />
                                </button>
                                <button
                                    @click="handleDelete(cliente)"
                                    class="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                                >
                                    <TrashIcon class="h-5 w-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div
            class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700"
        >
            <div class="flex-1 flex justify-between sm:hidden">
                <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="btn-secondary"
                >
                    Anterior
                </button>
                <button
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="btn-secondary"
                >
                    Siguiente
                </button>
            </div>
            <div
                class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
            >
                <div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        Mostrando
                        <span class="font-medium">{{
                            (currentPage - 1) * itemsPerPage + 1
                        }}</span>
                        a
                        <span class="font-medium">
                            {{
                                Math.min(
                                    currentPage * itemsPerPage,
                                    sortedClientes.length,
                                )
                            }}
                        </span>
                        de
                        <span class="font-medium">{{
                            sortedClientes.length
                        }}</span>
                        resultados
                    </p>
                </div>
                <div>
                    <nav
                        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    >
                        <!-- Botones de paginación -->
                        <button
                            v-for="page in totalPages"
                            :key="page"
                            @click="currentPage = page"
                            :class="[
                                'relative inline-flex items-center px-4 py-2 text-sm font-medium',
                                page === currentPage
                                    ? 'z-10 bg-blue-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700',
                                'border border-gray-300 dark:border-gray-600',
                            ]"
                        >
                            {{ page }}
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
