<template>
    <div>
        <canvas ref="chart"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import { Chart, registerables } from "chart.js";

// Registrar todos los componentes necesarios
Chart.register(...registerables);

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});

const chart = ref(null);
let chartInstance = null;

const createChart = () => {
    if (chartInstance) {
        chartInstance.destroy();
    }

    const ctx = chart.value.getContext("2d");
    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: props.data.map((item) => item.date),
            datasets: [
                {
                    label: "IPC",
                    data: props.data.map((item) => item.ipc),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
                {
                    label: "ICC",
                    data: props.data.map((item) => item.icc),
                    borderColor: "rgba(153, 102, 255, 1)",
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                },
                {
                    label: "ICL",
                    data: props.data.map((item) => item.icl),
                    borderColor: "rgba(255, 159, 64, 1)",
                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Fecha",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Valor",
                    },
                },
            },
        },
    });
};

onMounted(() => {
    createChart();
});

watch(() => props.data, createChart, { deep: true });

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});
</script>
