<template>
    <div class="table-body">
        <div v-for="cliente in clientes" :key="cliente._id" class="table-row">
            <div class="table-cell">{{ cliente.fullName }}</div>
            <div class="table-cell hidden md:table-cell">
                {{ cliente.email }}
            </div>
            <div class="table-cell">{{ cliente.phone[0].number }}</div>
            <div class="table-cell hidden md:table-cell">
                {{ cliente.taxId }}
            </div>
            <div class="table-cell hidden md:table-cell">
                <span
                    :class="[
                        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                        cliente.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
                    ]"
                    >{{ cliente.status }}</span
                >
            </div>
            <div class="table-cell">
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
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    clientes: {
        type: Array,
        required: true,
    },
});

defineEmits(["edit", "view"]);
</script>

<style scoped>
.table-body {
    display: table-row-group;
}

.table-row {
    display: table-row;
}

.table-row:hover {
    background-color: #f9fafb;
}

.table-cell {
    display: table-cell;
    padding: 0.75rem 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
    .table-row:hover {
        background-color: rgba(55, 65, 81, 0.5);
    }

    .table-cell {
        border-color: #374151;
    }
}
</style>
