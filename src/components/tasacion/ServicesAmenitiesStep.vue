<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Servicios y Comodidades
        </h3>
        <!-- Servicios Básicos -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >Servicios Básicos</label
            >
            <div class="grid grid-cols-2 gap-2">
                <div
                    v-for="servicio in serviciosBasicos"
                    :key="servicio"
                    class="flex items-center"
                >
                    <input
                        v-model="localForm.serviciosBasicos"
                        type="checkbox"
                        :value="servicio"
                        :id="'servicio-' + servicio"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                        :for="'servicio-' + servicio"
                        class="ml-2 block text-sm text-gray-900"
                        >{{ servicio }}</label
                    >
                </div>
            </div>
        </div>

        <!-- Amenities/Extras -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
                >Amenities/Extras</label
            >
            <div class="grid grid-cols-2 gap-2">
                <div
                    v-for="amenity in amenities"
                    :key="amenity"
                    class="flex items-center"
                >
                    <input
                        v-model="localForm.amenities"
                        type="checkbox"
                        :value="amenity"
                        :id="'amenity-' + amenity"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                        :for="'amenity-' + amenity"
                        class="ml-2 block text-sm text-gray-900"
                        >{{ amenity }}</label
                    >
                </div>
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

const serviciosBasicos = ["Agua", "Gas", "Electricidad", "Cloacas", "Internet"];
const amenities = [
    "Piscina",
    "Jardín",
    "Cochera",
    "Ascensor",
    "Seguridad",
    "Quincho",
    "Aire acondicionado",
    "Calefacción central",
];
</script>
