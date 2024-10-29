<template>
    <div
        class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 mb-6"
    >
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <div class="relative h-96">
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

// Registrar los componentes necesarios de Chart.js
Chart.register(...registerables);

const props = defineProps({
    title: String,
    chartData: Object,
});

const chartCanvas = ref(null);

onMounted(() => {
    const ctx = chartCanvas.value.getContext("2d");
    new Chart(ctx, {
        type: "bar", // Cambiar a 'line' o 'pie' según el gráfico
        data: props.chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    enabled: true,
                },
                legend: {
                    display: true,
                    position: "top",
                },
            },
        },
    });
});
</script>
