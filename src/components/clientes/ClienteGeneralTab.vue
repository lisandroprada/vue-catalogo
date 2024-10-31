<template>
    <div>
        <h3>Información General</h3>
        <!-- Campos del formulario general -->
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useClientesStore } from "@/stores/clientesStore";

const clientesStore = useClientesStore();
const form = ref(clientesStore.cliente);

watch(
    () => clientesStore.cliente,
    (newCliente) => {
        form.value = newCliente;
    },
    { immediate: true, deep: true },
);
</script>
