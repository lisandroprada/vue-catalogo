<template>
    <div class="dashboard">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Estado de Cuenta -->
            <div class="card">
                <h3 class="card-title">Estado de Cuenta</h3>
                <div class="card-content">
                    <p>Total Deuda: ${{ accountStatus.totalDebt }}</p>
                    <p>Último Pago: ${{ accountStatus.lastPayment }}</p>
                    <p>Próximo Vencimiento: {{ accountStatus.nextDueDate }}</p>
                </div>
            </div>

            <!-- Historial de Actividades -->
            <div class="card">
                <h3 class="card-title">Historial de Actividades</h3>
                <ul class="activity-list">
                    <li v-for="activity in activities" :key="activity.id">
                        <p>{{ activity.date }} - {{ activity.description }}</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Gráficos y Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="card">
                <h3 class="card-title">Gráfico de Pagos</h3>
                <div class="card-content">
                    <LineChart :data="paymentChartData" />
                </div>
            </div>
            <div class="card">
                <h3 class="card-title">Estadísticas de Contratos</h3>
                <div class="card-content">
                    <BarChart :data="contractStatsData" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import LineChart from "@/components/clientes/charts/LineChart.vue";
import BarChart from "@/components/clientes/charts/BarChart.vue";

const accountStatus = ref({
    totalDebt: 1200,
    lastPayment: 300,
    nextDueDate: "2023-12-01",
});

const activities = ref([
    { id: 1, date: "2023-10-01", description: "Pago recibido" },
    { id: 2, date: "2023-09-15", description: "Contacto telefónico" },
    { id: 3, date: "2023-09-10", description: "Envío de factura" },
]);

const paymentChartData = ref({
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
        {
            label: "Pagos",
            data: [100, 200, 150, 300, 250, 400],
            borderColor: "#4A90E2",
            backgroundColor: "rgba(74, 144, 226, 0.2)",
        },
    ],
});

const contractStatsData = ref({
    labels: ["Activos", "Vencidos", "Pendientes"],
    datasets: [
        {
            label: "Contratos",
            data: [10, 5, 3],
            backgroundColor: ["#4A90E2", "#E94A4A", "#F5A623"],
        },
    ],
});
</script>

<style scoped>
.dashboard {
    padding: 1rem;
}
.card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem;
}
.card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
.card-content {
    font-size: 1rem;
}
.activity-list {
    list-style: none;
    padding: 0;
}
.activity-list li {
    margin-bottom: 0.5rem;
}
</style>
