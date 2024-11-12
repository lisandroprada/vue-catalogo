<template>
    <div
        class="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6"
    >
        <div>
            <h3
                class="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2"
            >
                Información de la Propiedad
            </h3>
            <div class="w-full max-w-sm min-w-[200px] mt-4">
                <FormSelect
                    v-model="localForm.tipoPropiedad"
                    id="tipoPropiedad"
                    label="Tipo de Propiedad"
                    :options="tipoPropiedadOptions"
                />
            </div>
            <div class="w-full max-w-sm min-w-[200px] mt-4">
                <FormInput
                    v-model="localForm.direccion"
                    type="text"
                    id="direccion"
                    label="Dirección"
                />
            </div>
            <div class="w-full max-w-sm min-w-[200px] mt-4">
                <FormSelect
                    v-model="localForm.ciudad"
                    id="ciudad"
                    label="Ciudad"
                    :options="ciudadOptions"
                />
            </div>
            <div class="w-full max-w-sm min-w-[200px] mt-4">
                <FormInput
                    v-model="localForm.barrio"
                    type="text"
                    id="barrio"
                    label="Barrio/Zona"
                />
            </div>
            <div class="grid grid-cols-2 max-w-sm mt-4 min-w-[200px] gap-4">
                <div class="w-full">
                    <FormInput
                        v-model="localForm.latitud"
                        type="number"
                        id="latitud"
                        label="Latitud"
                        step="any"
                    />
                </div>
                <div class="w-full">
                    <FormInput
                        v-model="localForm.longitud"
                        type="number"
                        id="longitud"
                        label="Longitud"
                        step="any"
                    />
                </div>
            </div>
        </div>
        <div>
            <AddressSearch
                v-model="localForm.direccion"
                @select-location="handleLocationSelect"
            />
            <div class="h-[300px] rounded-lg overflow-hidden mt-4">
                <LMap
                    v-model:zoom="zoom"
                    :center="mapCenter"
                    @click="handleMapClick"
                    :useGlobalLeaflet="true"
                >
                    <LTileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LMarker
                        v-if="localForm.latitud && localForm.longitud"
                        :lat-lng="[localForm.latitud, localForm.longitud]"
                    />
                </LMap>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import FormInput from "@/components/ui/FormInput.vue";
import FormSelect from "@/components/ui/FormSelect.vue";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import AddressSearch from "@/components/propiedades/AddressSearch.vue";

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

const tipoPropiedadOptions = [
    { value: "Casa", text: "Casa" },
    { value: "Dúplex", text: "Dúplex" },
    { value: "Edificio", text: "Edificio" },
    { value: "Departamento", text: "Departamento" },
    { value: "Lote", text: "Lote" },
    { value: "Macizo", text: "Macizo" },
    { value: "Chacra", text: "Chacra" },
    { value: "Terreno", text: "Terreno" },
];

const ciudadOptions = [
    { value: "Playa Unión", text: "Playa Unión" },
    { value: "Rawson", text: "Rawson" },
    { value: "Trelew", text: "Trelew" },
    { value: "Puerto Madryn", text: "Puerto Madryn" },
    { value: "Gaiman", text: "Gaiman" },
    { value: "Dolavon", text: "Dolavon" },
    { value: "28 de Julio", text: "28 de Julio" },
];

const mapCenter = ref([-43.29969127755103, -65.1021053755102]);
const zoom = ref(13);

const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    localForm.value.latitud = lat;
    localForm.value.longitud = lng;
    mapCenter.value = [lat, lng];
};

const handleLocationSelect = (location) => {
    localForm.value.direccion = location.address;
    localForm.value.latitud = location.lat;
    localForm.value.longitud = location.lng;
    mapCenter.value = [location.lat, location.lng];
};
</script>
