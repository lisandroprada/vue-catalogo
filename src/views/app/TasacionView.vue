<template>
    <ViewWrapper :title="title" :subtitle="subtitle">
        <Tabs :tabs="tabs" />
        <!-- <Modal
            v-if="showResultado"
            :visible="showResultado"
            title="Resultado de Tasación"
            @close="showResultado = false"
        > -->
        <!-- <TasacionResultado :form="form" /> -->
        <!-- </Modal> -->
    </ViewWrapper>
</template>

<script setup>
import { ref } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import Tabs from "@/components/ui/Tabs.vue";
import TasacionForm from "@/components/tasacion/TasacionForm.vue";
import ParametrosForm from "@/components/tasacion/ParametrosForm.vue";

import { DocumentTextIcon } from "@heroicons/vue/24/outline";

const title = "Tasación de Inmuebles";
const subtitle =
    "Ingrese los datos de la propiedad y vea el resultado de la tasación";

const form = ref({
    tipoPropiedad: "",
    direccion: "",
    ciudad: "",
    barrio: "",
    latitud: null,
    longitud: null,
    superficieCubierta: null,
    superficieSemicubierta: null,
    superficieTotal: null,
    dormitorios: null,
    banos: null,
    anoConstruccion: null,
    anoRemodelacion: null,
    estadoConservacion: "",
    serviciosBasicos: [],
    amenities: [],
    moneda: "",
});
const showResultado = ref(false);

const handleFormSubmit = (formData) => {
    form.value = formData;
    showResultado.value = true;
};

const tabs = [
    {
        name: "Tasación",
        icon: DocumentTextIcon,
        component: TasacionForm,
        props: { form: form.value },
    },
    {
        name: "Historial de Tasaciones",
        icon: DocumentTextIcon,
        component: TasacionForm,
        // props: { form: form.value },
    },
    {
        name: "Parámetros",
        icon: DocumentTextIcon,
        component: ParametrosForm,
        // props: { form: form.value },
    },
];
</script>
