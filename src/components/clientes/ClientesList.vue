<template>
    <div class="overflow-x-auto">
        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-8">
            <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            ></div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-red-600 text-center py-8">
            {{ error }}
        </div>

        <!-- Data table -->
        <div v-else class="min-w-full">
            <table
                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
                <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Nombre
                        </th>
                        <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Teléfono
                        </th>
                        <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Tipo
                        </th>
                        <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                            <span class="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr
                        v-for="cliente in clientes"
                        :key="cliente._id"
                        class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200"
                        >
                            {{ cliente.name }}
                        </td>
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200"
                        >
                            {{ cliente.email }}
                        </td>
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200"
                        >
                            {{ cliente.phone[0].number }}
                        </td>
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200"
                        >
                            {{ cliente.type }}
                        </td>
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200"
                        >
                            <span
                                :class="[
                                    'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                    cliente.status === 'active'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
                                ]"
                            >
                                {{ cliente.status }}
                            </span>
                        </td>
                        <td
                            class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                        >
                            <button
                                @click="$emit('edit', cliente)"
                                class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                            >
                                Editar
                            </button>
                            <button
                                @click="$emit('view', cliente)"
                                class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Ver
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div
            class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6"
        >
            <div class="flex flex-1 justify-between sm:hidden">
                <button
                    @click="clientesStore.prevPage"
                    :disabled="clientesStore.page === 0"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    @click="clientesStore.nextPage"
                    :disabled="
                        clientesStore.page === clientesStore.totalPages - 1
                    "
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div
                class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
            >
                <div>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        Mostrando
                        <span class="font-medium">{{
                            clientesStore.page * clientesStore.pageSize + 1
                        }}</span>
                        a
                        <span class="font-medium">{{
                            Math.min(
                                (clientesStore.page + 1) *
                                    clientesStore.pageSize,
                                clientes.length,
                            )
                        }}</span>
                        de
                        <span class="font-medium">{{ clientes.length }}</span>
                        resultados
                    </p>
                </div>
                <div>
                    <nav
                        class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            @click="clientesStore.setPage(0)"
                            :disabled="clientesStore.page === 0"
                            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span class="sr-only">First</span>
                            <ChevronLeftIcon
                                class="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            @click="clientesStore.prevPage"
                            :disabled="clientesStore.page === 0"
                            class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span class="sr-only">Previous</span>
                            <ChevronLeftIcon
                                class="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <span v-if="clientesStore.page > 2" class="px-2 py-2">
                            ...
                        </span>
                        <button
                            v-for="pageNumber in visiblePages"
                            :key="pageNumber"
                            @click="clientesStore.setPage(pageNumber - 1)"
                            :class="[
                                clientesStore.page === pageNumber - 1
                                    ? 'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                    : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                            ]"
                        >
                            {{ pageNumber }}
                        </button>
                        <span
                            v-if="
                                clientesStore.page <
                                clientesStore.totalPages - 3
                            "
                            class="px-2 py-2"
                        >
                            ...
                        </span>
                        <button
                            @click="clientesStore.nextPage"
                            :disabled="
                                clientesStore.page ===
                                clientesStore.totalPages - 1
                            "
                            class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span class="sr-only">Next</span>
                            <ChevronRightIcon
                                class="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                        <button
                            @click="
                                clientesStore.setPage(
                                    clientesStore.totalPages - 1,
                                )
                            "
                            :disabled="
                                clientesStore.page ===
                                clientesStore.totalPages - 1
                            "
                            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span class="sr-only">Last</span>
                            <ChevronRightIcon
                                class="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useClientesStore } from "@/stores/clientesStore";
import { useAuthStore } from "@/stores/authStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const clientesStore = useClientesStore();
const authStore = useAuthStore();

// Usar storeToRefs para mantener la reactividad
const { clientes, isLoading, error } = storeToRefs(clientesStore);

// Función para cargar los datos
const loadClientes = async () => {
    if (authStore.isAuthenticated) {
        await clientesStore.fetchClientes();
    }
};

// Cargar datos al montar el componente
onMounted(() => {
    loadClientes();
});

// Observar cambios en la autenticación
watch(
    () => authStore.isAuthenticated,
    (newValue) => {
        if (newValue) {
            loadClientes();
        }
    },
);

// Observar cambios en los parámetros de paginación
watch(
    [
        () => clientesStore.page,
        () => clientesStore.pageSize,
        () => clientesStore.searchTerm,
        () => clientesStore.sort,
    ],
    () => {
        loadClientes();
    },
);

defineEmits(["edit", "view"]);
</script>
