<template>
    <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
            Servicios y Comodidades
        </h3>
        <!-- Servicios Básicos -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Servicios Básicos
            </label>
            <div class="grid grid-cols-2 gap-2">
                <FormCheckbox
                    v-for="servicio in serviciosBasicos"
                    :key="servicio"
                    :modelValue="localForm.serviciosBasicos.includes(servicio)"
                    @update:modelValue="
                        updateServiciosBasicos(servicio, $event)
                    "
                    :id="'servicio-' + servicio"
                    :label="servicio"
                />
            </div>
        </div>

        <!-- Amenities/Extras -->
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Amenities/Extras
            </label>
            <div class="grid grid-cols-2 gap-2">
                <FormCheckbox
                    v-for="amenity in amenities"
                    :key="amenity"
                    :modelValue="localForm.amenities.includes(amenity)"
                    @update:modelValue="updateAmenities(amenity, $event)"
                    :id="'amenity-' + amenity"
                    :label="amenity"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import FormCheckbox from "@/components/ui/FormCheckbox.vue";

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

const updateServiciosBasicos = (servicio, isChecked) => {
    if (isChecked) {
        localForm.value.serviciosBasicos.push(servicio);
    } else {
        const index = localForm.value.serviciosBasicos.indexOf(servicio);
        if (index > -1) {
            localForm.value.serviciosBasicos.splice(index, 1);
        }
    }
};

const updateAmenities = (amenity, isChecked) => {
    if (isChecked) {
        localForm.value.amenities.push(amenity);
    } else {
        const index = localForm.value.amenities.indexOf(amenity);
        if (index > -1) {
            localForm.value.amenities.splice(index, 1);
        }
    }
};
</script>
