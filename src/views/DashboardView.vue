<template>
    <div class="relative z-0">
        <ViewWrapper
            title="Dashboard"
            subtitle="Visión general de la administración inmobiliaria"
        >
            <template #actions>
                <button class="btn-primary">Exportar Datos</button>
            </template>

            <!-- Resumen General -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    title="Total de Propiedades"
                    :stat="totalProperties"
                    trend="67.81%"
                    trendDescription="Desde la semana pasada"
                    trendColor="text-green-600"
                >
                    <template #icon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                    </template>
                </SummaryCard>
                <SummaryCard
                    title="Propiedades en Alquiler"
                    :stat="propertiesForRent"
                    trend="45.12%"
                    trendDescription="Desde la semana pasada"
                    trendColor="text-red-600"
                >
                    <template #icon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                        </svg>
                    </template>
                </SummaryCard>
                <SummaryCard
                    title="Propiedades en Venta"
                    :stat="propertiesForSale"
                    trend="30.45%"
                    trendDescription="Desde la semana pasada"
                    trendColor="text-green-600"
                >
                    <template #icon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                    </template>
                </SummaryCard>
                <SummaryCard
                    title="Propiedades Vendidas/Alquiladas este Mes"
                    :stat="propertiesSoldRentedThisMonth"
                    trend="12.34%"
                    trendDescription="Desde la semana pasada"
                    trendColor="text-red-600"
                >
                    <template #icon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                            />
                        </svg>
                    </template>
                </SummaryCard>
            </div>

            <!-- Actividad Diaria -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Actividad Diaria</h2>
                <DailyActivity
                    :comprobantes="comprobantes"
                    :vencimientos="vencimientos"
                    :morosos="morosos"
                />
            </div>

            <!-- Gráficos y Estadísticas -->
            <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartCard
                    title="Propiedades por Estado"
                    :chartData="propertiesByStatusChartData"
                />
                <ChartCard
                    title="Ventas/Alquileres Mensuales"
                    :chartData="monthlySalesRentalsChartData"
                />
                <ChartCard
                    title="Ingresos Mensuales"
                    :chartData="monthlyIncomeChartData"
                />
            </div>

            <!-- CRM y Seguimiento de Clientes -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">
                    CRM y Seguimiento de Clientes
                </h2>
                <ClientMessages :messages="clientMessages" />
                <ClientBirthdays :birthdays="clientBirthdays" />
            </div>

            <!-- Tareas y Recordatorios -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Tareas y Recordatorios</h2>
                <TasksList :tasks="tasks" />
                <AppointmentsList :appointments="appointments" />
            </div>

            <!-- Notificaciones y Alertas -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold">Notificaciones y Alertas</h2>
                <Notifications :alerts="alerts" />
            </div>
        </ViewWrapper>
    </div>
</template>

<script setup>
import { ref } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import SummaryCard from "@/components/dashboard/SummaryCard.vue";
import DailyActivity from "@/components/dashboard/DailyActivity.vue";
import ChartCard from "@/components/dashboard/ChartCard.vue";
import ClientMessages from "@/components/dashboard/ClientMessages.vue";
import ClientBirthdays from "@/components/dashboard/ClientBirthdays.vue";
import TasksList from "@/components/dashboard/TasksList.vue";
import AppointmentsList from "@/components/dashboard/AppointmentsList.vue";
import Notifications from "@/components/dashboard/Notifications.vue";

// Datos simulados
const totalProperties = ref(120);
const propertiesForRent = ref(45);
const propertiesForSale = ref(30);
const propertiesSoldRentedThisMonth = ref(10);

const comprobantes = ref([
    { id: 1, type: "Emitido", description: "Factura #123", date: "2023-10-01" },
    { id: 2, type: "Recibido", description: "Recibo #456", date: "2023-10-01" },
]);

const vencimientos = ref([
    { id: 1, description: "Contrato #789", date: "2023-10-05" },
]);

const morosos = ref([
    { id: 1, name: "Juan Pérez", amount: "$500", dueDate: "2023-09-30" },
]);

const propertiesByStatusChartData = ref({
    labels: ["En Alquiler", "En Venta", "Vendidas", "Alquiladas"],
    datasets: [
        {
            label: "Propiedades",
            data: [45, 30, 20, 25],
            backgroundColor: ["#1E3A8A", "#3B82F6", "#93C5FD", "#60A5FA"],
        },
    ],
});

const monthlySalesRentalsChartData = ref({
    labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
    ],
    datasets: [
        {
            label: "Ventas",
            data: [5, 10, 8, 12, 15, 20, 18, 22, 25, 30],
            borderColor: "#1E3A8A",
            fill: false,
        },
        {
            label: "Alquileres",
            data: [10, 15, 12, 18, 20, 25, 22, 28, 30, 35],
            borderColor: "#3B82F6",
            fill: false,
        },
    ],
});

const monthlyIncomeChartData = ref({
    labels: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
    ],
    datasets: [
        {
            label: "Ingresos",
            data: [1000, 1500, 1200, 1800, 2000, 2500, 2200, 2800, 3000, 3500],
            backgroundColor: "#93C5FD",
        },
    ],
});

const clientMessages = ref([
    {
        id: 1,
        name: "Ana Gómez",
        message: "Consulta sobre propiedad #123",
        date: "2023-10-01",
    },
]);

const clientBirthdays = ref([
    { id: 1, name: "Carlos López", birthday: "2023-10-05" },
]);

const tasks = ref([
    { id: 1, description: "Revisar contrato #789", dueDate: "2023-10-02" },
]);

const appointments = ref([
    { id: 1, description: "Cita con cliente #456", date: "2023-10-03" },
]);

const alerts = ref([
    {
        id: 1,
        type: "Vencimiento",
        description: "Contrato #789 vence pronto",
        date: "2023-10-05",
    },
]);
</script>
