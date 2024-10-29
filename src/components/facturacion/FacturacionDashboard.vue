<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Dashboard de Facturación</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-2">Facturas del Mes</h3>
                <canvas id="facturasMesChart"></canvas>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-2">Compras del Mes</h3>
                <canvas id="comprasMesChart"></canvas>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-2">Ventas del Mes</h3>
                <canvas id="ventasMesChart"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart } from "chart.js";

const renderChart = (id, data, label) => {
    const ctx = document.getElementById(id).getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
            datasets: [
                {
                    label: label,
                    data: data,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};

onMounted(() => {
    renderChart("facturasMesChart", [12, 19, 3, 5, 2, 3], "Facturas");
    renderChart("comprasMesChart", [2, 3, 20, 5, 1, 4], "Compras");
    renderChart("ventasMesChart", [3, 10, 13, 15, 22, 30], "Ventas");
});
</script>
