<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Información de la Propiedad
        </h3>
        <div>
            <label
                for="tipoPropiedad"
                class="block text-sm font-medium text-gray-700"
                >Tipo de Propiedad</label
            >
            <select
                v-model="localForm.tipoPropiedad"
                id="tipoPropiedad"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            >
                <option value="" disabled>Seleccione</option>
                <option
                    v-for="tipo in tiposPropiedad"
                    :key="tipo"
                    :value="tipo"
                >
                    {{ tipo }}
                </option>
            </select>
        </div>
        <div>
            <label
                for="direccion"
                class="block text-sm font-medium text-gray-700"
                >Dirección</label
            >
            <input
                v-model="localForm.direccion"
                type="text"
                id="direccion"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                required
            />
        </div>
        <div>
            <label for="ciudad" class="block text-sm font-medium text-gray-700"
                >Ciudad</label
            >
            <select
                v-model="localForm.ciudad"
                id="ciudad"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            >
                <option value="" disabled>Seleccione</option>
                <option
                    v-for="ciudad in ciudades"
                    :key="ciudad"
                    :value="ciudad"
                >
                    {{ ciudad }}
                </option>
            </select>
        </div>
        <div>
            <label for="barrio" class="block text-sm font-medium text-gray-700"
                >Barrio/Zona</label
            >
            <input
                v-model="localForm.barrio"
                type="text"
                id="barrio"
                class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label
                    for="latitud"
                    class="block text-sm font-medium text-gray-700"
                    >Latitud</label
                >
                <input
                    v-model="localForm.latitud"
                    type="number"
                    id="latitud"
                    step="any"
                    class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                />
            </div>
            <div>
                <label
                    for="longitud"
                    class="block text-sm font-medium text-gray-700"
                    >Longitud</label
                >
                <input
                    v-model="localForm.longitud"
                    type="number"
                    id="longitud"
                    step="any"
                    class="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
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

const tiposPropiedad = [
    "Casa",
    "Dúplex",
    "Edificio",
    "Departamento",
    "Lote",
    "Macizo",
    "Chacra",
    "Terreno",
];

const ciudades = [
    "Playa Unión",
    "Rawson",
    "Trelew",
    "Puerto Madryn",
    "Gaiman",
    "Dolavon",
    "28 de Julio",
];
</script>
