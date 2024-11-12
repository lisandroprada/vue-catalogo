<template>
    <div class="table-header">
        <div
            v-for="(header, index) in headers"
            :key="index"
            :class="['table-cell', header.class]"
        >
            {{ header.text }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const headers = ref([
    { text: "Nombre", class: "w-1/6" },
    { text: "Email", class: "w-1/6 hidden md:table-cell" },
    { text: "Teléfono", class: "w-1/6" },
    { text: "CUIT/CUIL", class: "w-1/6 hidden md:table-cell" },
    { text: "Status", class: "w-1/6 hidden md:table-cell" },
    { text: "Actions", class: "w-1/6" },
]);
</script>

<style scoped>
.table-header {
    display: table-header-group;
    background-color: #f3f4f6;
    font-weight: 600;
}

.table-cell {
    display: table-cell;
    padding: 0.75rem 1rem;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
    .table-header {
        background-color: #1f2937;
    }

    .table-cell {
        border-color: #374151;
    }
}
</style>
