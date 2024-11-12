<template>
    <div class="max-w-7xl bg-gray-50 rounded-lg shadow-xl overflow-hidden flex">
        <!-- Integración del Stepper -->
        <div class="px-6 py-8 bg-gray-100 flex-shrink-0">
            <Stepper :steps="steps" v-model:currentStep="currentStep" />
        </div>

        <!-- Formulario de Paso -->
        <div class="flex-1 overflow-y-auto px-6 py-8 bg-gray-100">
            <form @submit.prevent="handleSubmit">
                <div v-if="currentStep === 0">
                    <!-- Información de la Propiedad -->
                    <PropertyInformationStep
                        :form="form"
                        @update:form="updateForm"
                    />
                </div>
                <div v-if="currentStep === 1">
                    <!-- Dimensiones -->
                    <DimensionsStep :form="form" @update:form="updateForm" />
                </div>
                <div v-if="currentStep === 2">
                    <!-- Antigüedad y Estado -->
                    <AgeConditionStep :form="form" @update:form="updateForm" />
                </div>
                <div v-if="currentStep === 3">
                    <!-- Servicios y Comodidades -->
                    <ServicesAmenitiesStep
                        :form="form"
                        @update:form="updateForm"
                    />
                </div>
                <div v-if="currentStep === 4">
                    <!-- Preferencias del Usuario -->
                    <UserPreferencesStep
                        :form="form"
                        @update:form="updateForm"
                    />
                </div>
                <div v-if="currentStep === 5">
                    <!-- Resultado de la Tasación -->
                    <ValuationResultStep
                        :form="form"
                        :valorEstimado="valorEstimado"
                        :valorComparativo="valorComparativo"
                        :valorReposicion="valorReposicion"
                        :valorCapitalizacion="valorCapitalizacion"
                        :valorM2Zona="valorM2Zona"
                        :costoConstruccionM2="costoConstruccionM2"
                        :factorDepreciacion="factorDepreciacion"
                        :valorTerrenoM2="valorTerrenoM2"
                        :tipoCambio="tipoCambio"
                    />
                </div>
                <div v-if="currentStep === 6">
                    <!-- Detalles del Cálculo -->
                    <CalculationDetailsStep
                        :form="form"
                        :valorEstimado="valorEstimado"
                        :valorComparativo="valorComparativo"
                        :valorReposicion="valorReposicion"
                        :valorCapitalizacion="valorCapitalizacion"
                        :valorM2Zona="valorM2Zona"
                        :costoConstruccionM2="costoConstruccionM2"
                        :factorDepreciacion="factorDepreciacion"
                        :valorTerrenoM2="valorTerrenoM2"
                        :tipoCambio="tipoCambio"
                    />
                </div>

                <!-- Navegación de botones -->
                <div class="mt-10 flex justify-between">
                    <button
                        type="button"
                        @click="goBack"
                        :disabled="currentStep === 0"
                        class="px-4 py-2 border rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700"
                    >
                        Anterior
                    </button>
                    <button
                        type="button"
                        v-if="currentStep < steps.length - 1"
                        @click="goNext"
                        class="px-4 py-2 border rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Siguiente
                    </button>
                    <button
                        type="submit"
                        v-else
                        class="px-4 py-2 border rounded-md bg-green-600 hover:bg-green-700 text-white"
                    >
                        Finalizar y Ver Tasación
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Stepper from "@/components/ui/Stepper.vue";
import AgeConditionStep from "@/components/tasacion/tasacion/AgeConditionStep.vue";
import CalculationDetailsStep from "@/components/tasacion/tasacion/CalculationDetailsStep.vue";
import DimensionsStep from "@/components/tasacion/tasacion/DimensionsStep.vue";
import PropertyInformationStep from "@/components/tasacion/tasacion/PropertyInformationStep.vue";
import ServicesAmenitiesStep from "@/components/tasacion/tasacion/ServicesAmenitiesStep.vue";
import UserPreferencesStep from "@/components/tasacion/tasacion/UserPreferencesStep.vue";
import ValuationResultStep from "@/components/tasacion/tasacion/ValuationResultStep.vue";
import { mockData } from "@/api/mockApi"; // Importa los datos simulados
import {
    calcularValorComparativo,
    calcularValorReposicion,
    calcularValorCapitalizacion,
    calcularValorFinal,
} from "@/utils/calculoTasacion";

const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
});

const currentStep = ref(0);
const steps = [
    "Información de la Propiedad",
    "Dimensiones",
    "Antigüedad y Estado",
    "Servicios y Comodidades",
    "Preferencias del Usuario",
    "Resultado de la Tasación",
    "Detalles del Cálculo",
];

const goNext = () => {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++;
    }
};

const goBack = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
};

const loading = ref(true);
const valorEstimado = ref(0);
const valorComparativo = ref(0);
const valorReposicion = ref(0);
const valorCapitalizacion = ref(0);
const valorM2Zona = ref(0);
const costoConstruccionM2 = ref(0);
const factorDepreciacion = ref(0);
const valorTerrenoM2 = ref(0);
const tipoCambio = ref(0);

const fetchData = async () => {
    try {
        const valoresM2Zona = mockData.valoresM2Zona;
        const costoConstruccion = mockData.costoConstruccion;
        const valorTerrenoZona = mockData.valorTerrenoZona;
        const tipoCambioData = mockData.tipoCambio;

        valorM2Zona.value = valoresM2Zona[props.form.ciudad];
        costoConstruccionM2.value = costoConstruccion.costoConstruccionM2;
        valorTerrenoM2.value = valorTerrenoZona[props.form.ciudad];
        tipoCambio.value =
            tipoCambioData[
                props.form.moneda === "Dólar Oficial (USD)"
                    ? "dolarOficial"
                    : "dolarBlue"
            ];

        calcularTasacion();
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading.value = false;
    }
};

const calcularTasacion = () => {
    const superficieTotal =
        parseFloat(props.form.superficieCubierta) +
        (parseFloat(props.form.superficieSemicubierta) || 0) * 0.5;
    const valorTerreno =
        valorTerrenoM2.value * parseFloat(props.form.superficieTotal);

    // Método Comparativo de Mercado
    valorComparativo.value = calcularValorComparativo(
        valorM2Zona.value,
        parseFloat(props.form.superficieCubierta),
        parseFloat(props.form.superficieSemicubierta) || 0,
        0.5, // Coeficiente de reducción para superficie semicubierta
        0.1, // Ajuste (puede ser dinámico según las características de la propiedad)
    );

    // Método de Costo de Reposición
    const antiguedad =
        new Date().getFullYear() - parseInt(props.form.anoConstruccion);
    const tasaDepreciacionAnual = 0.01; // 1% anual
    factorDepreciacion.value = 1 - antiguedad * tasaDepreciacionAnual;
    valorReposicion.value =
        calcularValorReposicion(
            parseFloat(props.form.superficieCubierta),
            parseFloat(props.form.superficieSemicubierta) || 0,
            0.5, // Coeficiente de reducción para superficie semicubierta
            costoConstruccionM2.value,
            factorDepreciacion.value,
        ) + valorTerreno;

    // Método de Capitalización de Rentas
    valorCapitalizacion.value = calcularValorCapitalizacion(
        1000, // Ingreso mensual estimado (puede ser dinámico)
        200, // Gastos de mantenimiento estimados (puede ser dinámico)
        0.05, // Tasa de capitalización (puede ser dinámica según el mercado)
    );

    // Valor Final de Tasación
    valorEstimado.value = calcularValorFinal(
        valorComparativo.value,
        valorReposicion.value,
        valorCapitalizacion.value,
    );

    // Conversión de Moneda
    if (props.form.moneda !== "Pesos Argentinos (ARS)") {
        valorEstimado.value /= tipoCambio.value;
        valorComparativo.value /= tipoCambio.value;
        valorReposicion.value /= tipoCambio.value;
        valorCapitalizacion.value /= tipoCambio.value;
    }
};

onMounted(() => {
    fetchData();
});

watch(() => props.form, fetchData, { deep: true });

const currency = (value, currency) => {
    const formatter = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: currency === "Pesos Argentinos (ARS)" ? "ARS" : "USD",
    });
    return formatter.format(value);
};

const updateForm = (newForm) => {
    Object.assign(props.form, newForm);
};
</script>
