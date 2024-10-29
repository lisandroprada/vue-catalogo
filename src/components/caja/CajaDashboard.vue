<template>
    <div>
        <h2 class="text-2xl font-semibold mb-4">Dashboard de Caja</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Ingresos Totales
                </h3>
                <p
                    class="text-2xl font-semibold text-green-600 dark:text-green-400"
                >
                    $12,345
                </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Egresos Totales
                </h3>
                <p
                    class="text-2xl font-semibold text-red-600 dark:text-red-400"
                >
                    $8,765
                </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Saldo Actual
                </h3>
                <p
                    class="text-2xl font-semibold text-blue-600 dark:text-blue-400"
                >
                    $3,580
                </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Flujo de Caja
                </h3>
                <p
                    class="text-2xl font-semibold text-yellow-600 dark:text-yellow-400"
                >
                    Positivo
                </p>
            </div>
        </div>
        <div class="mt-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Gráfico de Flujo de Caja
            </h3>
            <div class="relative h-96">
                <canvas id="cashFlowChart"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";

// Registrar todos los componentes necesarios de Chart.js
Chart.register(...registerables);

onMounted(() => {
    const ctx = document.getElementById("cashFlowChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
            datasets: [
                {
                    label: "Flujo de Caja",
                    data: [1200, 1900, 3000, 5000, 2000, 3000],
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
});
</script>
