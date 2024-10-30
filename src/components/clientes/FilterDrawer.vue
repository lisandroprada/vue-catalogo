<template>
    <div class="drawer bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-64">
        <div class="drawer-header flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Filtros
            </h3>
            <button @click="closeDrawer" class="text-red-500 hover:underline">
                Cerrar
            </button>
        </div>
        <div class="drawer-body">
            <form @submit.prevent="applyFilters" class="space-y-4">
                <div>
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Nombre</label
                    >
                    <input
                        v-model="filters.name"
                        id="name"
                        type="text"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Email</label
                    >
                    <input
                        v-model="filters.email"
                        id="email"
                        type="email"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <!-- Agrega más campos de filtro según sea necesario -->
                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Aplicar Filtros
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useClientesStore } from "@/stores/clientesStore";

export default {
    props: {
        show: Boolean,
    },
    setup(props, { emit }) {
        const clientesStore = useClientesStore();
        const filters = ref({
            name: "",
            email: "",
            // Agrega más campos de filtro según sea necesario
        });

        const applyFilters = () => {
            // Lógica para aplicar filtros
            // Puedes usar los filtros para hacer una solicitud al backend
            // y actualizar la lista de clientes
            clientesStore.setSearchTerm(filters.value.name);
            closeDrawer();
        };

        const closeDrawer = () => {
            emit("update:show", false);
        };

        return {
            filters,
            applyFilters,
            closeDrawer,
        };
    },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
