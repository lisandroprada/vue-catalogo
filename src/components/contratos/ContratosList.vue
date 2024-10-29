<script setup>
import { ref, computed } from "vue";
import { useContratosStore } from "@/stores/contratosStore";
import { FunnelIcon, PencilIcon, EyeIcon } from "@heroicons/vue/24/outline";

const contratosStore = useContratosStore();
const searchQuery = ref("");
const sortKey = ref("fecha");
const sortOrder = ref("asc");

const filteredContratos = computed(() => {
    let contratos = contratosStore.contratos;

    if (searchQuery.value) {
        contratos = contratos.filter((contrato) =>
            contrato.cliente
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()),
        );
    }

    return contratos.sort((a, b) => {
        let result = 0;
        if (a[sortKey.value] < b[sortKey.value]) result = -1;
        if (a[sortKey.value] > b[sortKey.value]) result = 1;
        return sortOrder.value === "asc" ? result : -result;
    });
});

const handleSort = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
        sortKey.value = key;
        sortOrder.value = "asc";
    }
};
</script>

<template>
    <div>
        <div class="flex items-center justify-between mb-4">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por cliente"
                class="input"
            />
            <button @click="handleSort('fecha')" class="btn-secondary">
                Ordenar por Fecha
            </button>
            <button @click="handleSort('propiedad')" class="btn-secondary">
                Ordenar por Propiedad
            </button>
            <button @click="handleSort('cliente')" class="btn-secondary">
                Ordenar por Cliente
            </button>
        </div>
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Propiedad</th>
                    <th>Fecha</th>
                    <th>Tipo de Incremento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contrato in filteredContratos" :key="contrato.id">
                    <td>{{ contrato.cliente }}</td>
                    <td>{{ contrato.propiedad }}</td>
                    <td>{{ contrato.fecha }}</td>
                    <td>{{ contrato.tipoIncremento }}</td>
                    <td>
                        <button
                            @click="$emit('view', contrato)"
                            class="btn-icon"
                        >
                            <EyeIcon class="h-4 w-4" />
                        </button>
                        <button
                            @click="$emit('edit', contrato)"
                            class="btn-icon"
                        >
                            <PencilIcon class="h-4 w-4" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
