<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Antigüedad y Estado
        </h3>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label
                    for="anoConstruccion"
                    class="block text-sm font-medium text-gray-700"
                    >Año de Construcción</label
                >
                <input
                    v-model="localForm.anoConstruccion"
                    type="number"
                    id="anoConstruccion"
                    class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                    required
                />
            </div>
            <div>
                <label
                    for="anoRemodelacion"
                    class="block text-sm font-medium text-gray-700"
                    >Año de Última Remodelación</label
                >
                <input
                    v-model="localForm.anoRemodelacion"
                    type="number"
                    id="anoRemodelacion"
                    class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
            </div>
        </div>
        <div>
            <label
                for="estadoConservacion"
                class="block text-sm font-medium text-gray-700"
                >Estado de Conservación</label
            >
            <select
                v-model="localForm.estadoConservacion"
                id="estadoConservacion"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            >
                <option value="" disabled>Seleccione</option>
                <option
                    v-for="estado in estadosConservacion"
                    :key="estado"
                    :value="estado"
                >
                    {{ estado }}
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

const estadosConservacion = ["Nuevo", "Excelente", "Bueno", "Regular", "Malo"];
</script>
