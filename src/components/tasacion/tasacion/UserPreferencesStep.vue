<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Preferencias del Usuario
        </h3>
        <FormSelect
            :modelValue="localForm.moneda"
            @update:modelValue="localForm.moneda = $event"
            id="moneda"
            label="Moneda de Tasación Preferida"
            :options="
                monedas.map((moneda) => ({ value: moneda, text: moneda }))
            "
        />
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import FormSelect from "@/components/ui/FormSelect.vue";

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
