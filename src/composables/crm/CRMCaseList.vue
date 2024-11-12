<script setup>
import { ref, computed } from "vue";
import { useCRMStore } from "@/stores/crmStore";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/vue/24/outline";

const crmStore = useCRMStore();
crmStore.fetchCases();

const emit = defineEmits(["edit", "view", "delete"]);

const searchQuery = ref("");
const statusFilter = ref("");

const filteredCases = computed(() => {
    return crmStore.cases.filter((crmCase) => {
        const matchesSearch = crmCase.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
        const matchesStatus = statusFilter.value
            ? crmCase.status === statusFilter.value
            : true;
        return matchesSearch && matchesStatus;
    });
});

const handleEdit = (crmCase) => {
    emit("edit", crmCase);
};

const handleView = (crmCase) => {
    emit("view", crmCase);
};

const handleDelete = (crmCase) => {
    if (confirm(`¿Está seguro de eliminar el caso "${crmCase.title}"?`)) {
        emit("delete", crmCase);
    }
};
</script>

<template>
    <div>
        <!-- Filtros -->
        <div class="flex gap-4 mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por título"
                class="input"
            />
            <select v-model="statusFilter" class="input">
                <option value="">Todos los estados</option>
                <option value="open">Abierto</option>
                <option value="in-progress">En Progreso</option>
                <option value="closed">Cerrado</option>
            </select>
        </div>

        <!-- Lista de Casos -->
        <div class="grid grid-cols-1 gap-6">
            <div
                v-for="crmCase in filteredCases"
                :key="crmCase.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
                <div class="flex justify-between items-center">
                    <div>
                        <h3
                            class="text-lg font-medium text-gray-900 dark:text-white"
                        >
                            {{ crmCase.title }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {{ crmCase.description }}
                        </p>
                        <p class="text-xs text-gray-400 dark:text-gray-500">
                            Estado: {{ crmCase.status }}
                        </p>
                    </div>
                    <div class="flex gap-2">
                        <button
                            @click="handleView(crmCase)"
                            class="btn-secondary"
                        >
                            <EyeIcon class="h-5 w-5" />
                        </button>
                        <button
                            @click="handleEdit(crmCase)"
                            class="btn-primary"
                        >
                            <PencilIcon class="h-5 w-5" />
                        </button>
                        <button
                            @click="handleDelete(crmCase)"
                            class="btn-danger"
                        >
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    color: #111827;
}
.input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
.btn-secondary {
    background-color: #e5e7eb;
    color: #111827;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-secondary:hover {
    background-color: #d1d5db;
}
.btn-primary {
    background-color: #3b82f6;
    color: #ffffff;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-primary:hover {
    background-color: #2563eb;
}
.btn-danger {
    background-color: #ef4444;
    color: #ffffff;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-danger:hover {
    background-color: #dc2626;
}
</style>
