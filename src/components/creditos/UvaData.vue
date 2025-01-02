<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    UVA - Evolución
                </h3>
                <div class="mt-2 flex items-baseline gap-2">
                    <span
                        class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                    >
                        ${{ currentValue }}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                        {{ currentDate }}
                    </span>
                </div>
            </div>
            <div class="flex gap-2">
                <button
                    v-for="period in periods"
                    :key="period.value"
                    @click="selectedPeriod = period.value"
                    class="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                    :class="[
                        selectedPeriod === period.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
                    ]"
                >
                    {{ period.label }}
                </button>
            </div>
        </div>
        <div style="height: 400px">
            <Line
                v-if="isDataReady"
                :data="chartData"
                :options="chartOptions"
            />
        </div>
        <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Fuente: Banco Central de la República Argentina (BCRA)
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import { defineComponent } from 'vue';

defineComponent({
    name: 'UvaData'
});

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
);

// Períodos disponibles
const periods = [
    { label: "6 Meses", value: 6 },
    { label: "1 Año", value: 12 },
    { label: "5 Años", value: 60 },
];

// Estado inicial
const uvaData = ref([]);
const isDataReady = ref(false);
const selectedPeriod = ref(6);

// Computed properties para el valor actual
const currentValue = computed(() => {
    if (uvaData.value.length > 0) {
        return uvaData.value[uvaData.value.length - 1].valor.toFixed(2);
    }
    return "0.00";
});

const currentDate = computed(() => {
    if (uvaData.value.length > 0) {
        const date = new Date(uvaData.value[uvaData.value.length - 1].fecha);
        return date.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
    return "";
});

// Computed property para filtrar datos según el período seleccionado
const filteredData = computed(() => {
    const days = selectedPeriod.value * 30;
    return uvaData.value.slice(-days);
});

// Computed properties para los datos del gráfico
const chartData = computed(() => ({
    labels: filteredData.value.map((item) => {
        const date = new Date(item.fecha);
        return selectedPeriod.value > 12
            ? date.toLocaleDateString("es-AR", {
                  month: "short",
                  year: "numeric",
              })
            : date.toLocaleDateString("es-AR", { month: "short" });
    }),
    datasets: [
        {
            label: "Valor UVA",
            data: filteredData.value.map((item) => item.valor),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            pointRadius: 0, // Eliminamos los puntos
            pointHoverRadius: 4, // Pero mantenemos el hover para interactividad
        },
    ],
}));

// Opciones del gráfico
const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 300,
    },
    elements: {
        line: {
            tension: 0.3,
        },
    },
    interaction: {
        intersect: false,
        mode: "index",
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                maxRotation: 45,
                minRotation: 45,
                autoSkip: true,
                maxTicksLimit: selectedPeriod.value > 12 ? 12 : 6,
            },
        },
        y: {
            beginAtZero: false,
            ticks: {
                callback: (value) => `$${value.toFixed(2)}`,
            },
        },
    },
    plugins: {
        legend: {
            display: false, // Ocultamos la leyenda ya que es redundante
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: (context) =>
                    `Valor UVA: $${context.parsed.y.toFixed(2)}`,
            },
        },
    },
}));

// Función para obtener datos de la API de Series de Tiempo
const fetchUVAData = async () => {
    try {
        const response = await axios.get(
            "https://api.argentinadatos.com/v1/finanzas/indices/uva",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (response.data && response.data.length > 0) {
            uvaData.value = response.data.map((item: any) => ({
                fecha: item.fecha,
                valor: parseFloat(item.valor),
            }));
            isDataReady.value = true;
        }
    } catch (error) {
        console.error("Error al obtener datos UVA:", error);
    }
};

// Inicializar al montar
onMounted(() => {
    fetchUVAData();
});

// Watch para actualizar los datos del gráfico cuando se cambia el período
watch(selectedPeriod, () => {
    isDataReady.value = false;
    fetchUVAData().then(() => {
        isDataReady.value = true;
    });
});
</script>
