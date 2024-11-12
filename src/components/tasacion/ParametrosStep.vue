<template>
    <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3
            class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-3 mb-6"
        >
            Parámetros de Tasación
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
                class="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
                <h4
                    class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                >
                    <MapPinIcon class="w-5 h-5 mr-2 text-blue-500" />
                    Valor M2 por Zona
                </h4>
                <ul class="space-y-2">
                    <li
                        v-for="(valor, zona) in valoresM2Zona"
                        :key="zona"
                        class="flex justify-between items-center"
                    >
                        <span class="text-gray-600">{{ zona }}</span>
                        <span class="font-medium text-gray-800">{{
                            currency(valor, "ARS")
                        }}</span>
                    </li>
                </ul>
            </div>
            <div
                class="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
                <h4
                    class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                >
                    <BuildingOfficeIcon class="w-5 h-5 mr-2 text-green-500" />
                    Costo de Construcción por M2
                </h4>
                <p class="text-3xl font-bold text-gray-800">
                    {{ currency(costoConstruccionM2, "ARS") }}
                </p>
            </div>
            <div
                class="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
                <h4
                    class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                >
                    <HomeIcon class="w-5 h-5 mr-2 text-yellow-500" />
                    Costo de Terreno por M2
                </h4>
                <ul class="space-y-2">
                    <li
                        v-for="(valor, zona) in valorTerrenoZona"
                        :key="zona"
                        class="flex justify-between items-center"
                    >
                        <span class="text-gray-600">{{ zona }}</span>
                        <span class="font-medium text-gray-800">{{
                            currency(valor, "ARS")
                        }}</span>
                    </li>
                </ul>
            </div>
            <div
                class="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
                <h4
                    class="text-lg font-semibold text-gray-800 mb-4 flex items-center"
                >
                    <ChartBarIcon class="w-5 h-5 mr-2 text-red-500" />
                    Indicadores de la Economía
                </h4>
                <div class="h-64">
                    <LineChart :data="economicIndicators" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { mockData } from "@/api/mockApi";
import LineChart from "@/components/tasacion/charts/LineChart.vue";
import {
    MapPinIcon,
    BuildingOfficeIcon,
    HomeIcon,
    ChartBarIcon,
} from "@heroicons/vue/24/solid";

const valoresM2Zona = ref({});
const costoConstruccionM2 = ref(0);
const valorTerrenoZona = ref({});
const economicIndicators = ref([]);

const fetchData = async () => {
    valoresM2Zona.value = mockData.valoresM2Zona;
    costoConstruccionM2.value = mockData.costoConstruccion.costoConstruccionM2;
    valorTerrenoZona.value = mockData.valorTerrenoZona;
    economicIndicators.value = mockData.economicIndicators;
};

onMounted(() => {
    fetchData();
});

const currency = (value, currency) => {
    const formatter = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: currency === "Pesos Argentinos (ARS)" ? "ARS" : "USD",
    });
    return formatter.format(value);
};
</script>
