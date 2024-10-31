<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
    data: Object,
});

const canvas = ref(null);
let chartInstance = null;

onMounted(() => {
    chartInstance = new Chart(canvas.value, {
        type: "bar",
        data: props.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
});

watch(
    () => props.data,
    (newData) => {
        if (chartInstance) {
            chartInstance.data = newData;
            chartInstance.update();
        }
    },
    { deep: true },
);
</script>

<style scoped>
canvas {
    width: 100%;
    height: 300px;
}
</style>
