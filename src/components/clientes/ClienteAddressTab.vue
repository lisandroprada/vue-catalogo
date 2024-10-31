<template>
    <div>
        <h3>Dirección</h3>
        <!-- Campos del formulario de dirección -->
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
