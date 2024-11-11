<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Dimensiones
        </h3>
        <div>
            <label
                for="superficieCubierta"
                class="block text-sm font-medium text-gray-700"
                >Superficie Cubierta (m²)</label
            >
            <input
                v-model="localForm.superficieCubierta"
                type="number"
                id="superficieCubierta"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                required
            />
        </div>
        <div>
            <label
                for="superficieSemicubierta"
                class="block text-sm font-medium text-gray-700"
                >Superficie Semicubierta (m²)</label
            >
            <input
                v-model="localForm.superficieSemicubierta"
                type="number"
                id="superficieSemicubierta"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            />
        </div>
        <div>
            <label
                for="superficieTotal"
                class="block text-sm font-medium text-gray-700"
                >Superficie Total del Terreno (m²)</label
            >
            <input
                v-model="localForm.superficieTotal"
                type="number"
                id="superficieTotal"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                required
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label
                    for="dormitorios"
                    class="block text-sm font-medium text-gray-700"
                    >Número de Dormitorios</label
                >
                <input
                    v-model="localForm.dormitorios"
                    type="number"
                    id="dormitorios"
                    class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                    required
                />
            </div>
            <div>
                <label
                    for="banos"
                    class="block text-sm font-medium text-gray-700"
                    >Número de Baños</label
                >
                <input
                    v-model="localForm.banos"
                    type="number"
                    id="banos"
                    class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                    required
                />
            </div>
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
</script>
