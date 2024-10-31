<script setup>
import { ref, onMounted } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "vue-chartjs";

// Registra los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

// Datos de ejemplo
const salesData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
        {
            label: "Ventas 2024",
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: "rgba(59, 130, 246, 0.5)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 1,
        },
    ],
};

const clientsData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
        {
            label: "Nuevos Clientes",
            data: [12, 19, 15, 22, 25, 18],
            borderColor: "rgb(34, 197, 94)",
            tension: 0.1,
            fill: false,
        },
    ],
};

const categoryData = {
    labels: ["Categoría A", "Categoría B", "Categoría C", "Categoría D"],
    datasets: [
        {
            data: [300, 200, 150, 100],
            backgroundColor: [
                "rgba(59, 130, 246, 0.5)",
                "rgba(34, 197, 94, 0.5)",
                "rgba(249, 115, 22, 0.5)",
                "rgba(168, 85, 247, 0.5)",
            ],
            borderColor: [
                "rgb(59, 130, 246)",
                "rgb(34, 197, 94)",
                "rgb(249, 115, 22)",
                "rgb(168, 85, 247)",
            ],
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
        },
    },
};

// Filtros
const selectedPeriod = ref("month");
const selectedYear = ref("2024");

const periods = [
    { value: "week", label: "Última Semana" },
    { value: "month", label: "Último Mes" },
    { value: "quarter", label: "Último Trimestre" },
    { value: "year", label: "Último Año" },
];

const years = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
];

const stats = ref([
    { label: "Total Ventas", value: "$45,678", change: "+12%", trend: "up" },
    { label: "Nuevos Clientes", value: "245", change: "+18%", trend: "up" },
    {
        label: "Tasa de Conversión",
        value: "3.2%",
        change: "-2%",
        trend: "down",
    },
    { label: "Ticket Promedio", value: "$186", change: "+5%", trend: "up" },
]);
</script>

<template>
    <ViewWrapper title="Reportes" subtitle="Análisis y estadísticas">
        <template #actions>
            <div class="flex items-center gap-4">
                <!-- Filtros -->
                <select
                    v-model="selectedPeriod"
                    class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm"
                >
                    <option
                        v-for="period in periods"
                        :key="period.value"
                        :value="period.value"
                    >
                        {{ period.label }}
                    </option>
                </select>

                <select
                    v-model="selectedYear"
                    class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-sm"
                >
                    <option
                        v-for="year in years"
                        :key="year.value"
                        :value="year.value"
                    >
                        {{ year.label }}
                    </option>
                </select>

                <button class="btn-primary flex items-center gap-2">
                    <ArrowDownTrayIcon class="h-5 w-5" />
                    Exportar
                </button>
            </div>
        </template>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div
                v-for="stat in stats"
                :key="stat.label"
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
                <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                    {{ stat.label }}
                </h3>
                <div class="mt-2 flex items-baseline">
                    <p
                        class="text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        {{ stat.value }}
                    </p>
                    <span
                        :class="[
                            'ml-2 text-sm font-medium',
                            stat.trend === 'up'
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400',
                        ]"
                    >
                        {{ stat.change }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <!-- Ventas -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3
                    class="text-lg font-medium text-gray-900 dark:text-white mb-4"
                >
                    Ventas Mensuales
                </h3>
                <div class="h-80">
                    <Bar :data="salesData" :options="chartOptions" />
                </div>
            </div>

            <!-- Clientes -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3
                    class="text-lg font-medium text-gray-900 dark:text-white mb-4"
                >
                    Nuevos Clientes
                </h3>
                <div class="h-80">
                    <Line :data="clientsData" :options="chartOptions" />
                </div>
            </div>

            <!-- Categorías -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3
                    class="text-lg font-medium text-gray-900 dark:text-white mb-4"
                >
                    Distribución por Categorías
                </h3>
                <div class="h-80">
                    <Pie :data="categoryData" :options="chartOptions" />
                </div>
            </div>

            <!-- Tabla de Top Clientes -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3
                    class="text-lg font-medium text-gray-900 dark:text-white mb-4"
                >
                    Top Clientes
                </h3>
                <div class="overflow-x-auto">
                    <table
                        class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    >
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    Cliente
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    Ventas
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    % del Total
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="divide-y divide-gray-200 dark:divide-gray-700"
                        >
                            <tr v-for="i in 5" :key="i">
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                >
                                    Cliente {{ i }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                >
                                    ${{ (Math.random() * 10000).toFixed(2) }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                                >
                                    {{ (Math.random() * 100).toFixed(1) }}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </ViewWrapper>
</template>
