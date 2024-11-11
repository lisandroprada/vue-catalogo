<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Preferencias del Usuario
        </h3>
        <div>
            <label for="moneda" class="block text-sm font-medium text-gray-700"
                >Moneda de Tasación Preferida</label
            >
            <select
                v-model="localForm.moneda"
                id="moneda"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            >
                <option value="" disabled>Seleccione</option>
                <option v-for="moneda in monedas" :key="moneda" :value="moneda">
                    {{ moneda }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["update:form"]);

const localForm = ref({ ...props.form });

watch(
    localForm,
    (newForm) => {
        emit("update:form", newForm);
    },
    { deep: true },
);

const monedas = [
    "Pesos Argentinos (ARS)",
    "Dólar Oficial (USD)",
    "Dólar Blue (USD Blue)",
];
</script>
