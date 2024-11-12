<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Antigüedad y Estado
        </h3>
        <div class="grid grid-cols-2 gap-4">
            <FormInput
                :modelValue="localForm.anoConstruccion"
                @update:modelValue="localForm.anoConstruccion = $event"
                type="number"
                id="anoConstruccion"
                label="Año de Construcción"
                required
            />
            <FormInput
                :modelValue="localForm.anoRemodelacion"
                @update:modelValue="localForm.anoRemodelacion = $event"
                type="number"
                id="anoRemodelacion"
                label="Año de Última Remodelación"
            />
        </div>
        <FormSelect
            :modelValue="localForm.estadoConservacion"
            @update:modelValue="localForm.estadoConservacion = $event"
            id="estadoConservacion"
            label="Estado de Conservación"
            :options="
                estadosConservacion.map((estado) => ({
                    value: estado,
                    text: estado,
                }))
            "
        />
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import FormInput from "@/components/ui/FormInput.vue";
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

const estadosConservacion = ["Nuevo", "Excelente", "Bueno", "Regular", "Malo"];
</script>
