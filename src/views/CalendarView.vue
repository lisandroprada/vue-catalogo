<script setup>
import { ref } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import { Calendar } from "v-calendar";
import "v-calendar/dist/style.css";

// Eventos de ejemplo
const events = ref([
    {
        id: 1,
        title: "Reunión con cliente",
        start: new Date(2024, 0, 15, 9, 0),
        end: new Date(2024, 0, 15, 10, 0),
        color: "blue",
    },
    {
        id: 2,
        title: "Presentación proyecto",
        start: new Date(2024, 0, 18, 14, 0),
        end: new Date(2024, 0, 18, 16, 0),
        color: "green",
    },
]);

const selectedDate = ref(new Date());
const showEventModal = ref(false);
const selectedEvent = ref(null);

const handleDateSelect = (date) => {
    console.log("Fecha seleccionada:", date);
};

const handleEventClick = (event) => {
    selectedEvent.value = event;
    showEventModal.value = true;
};
</script>

<template>
    <ViewWrapper title="Calendario" subtitle="Gestión de eventos y agenda">
        <template #actions>
            <button class="btn-primary flex items-center gap-2">
                <PlusIcon class="h-5 w-5" />
                Nuevo Evento
            </button>
        </template>

        <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Calendar
                :attributes="
                    events.map((event) => ({
                        dates: {
                            start: event.start,
                            end: event.end,
                        },
                        dot: {
                            color: event.color,
                        },
                        popover: {
                            label: event.title,
                        },
                        customData: event,
                    }))
                "
                class="custom-calendar"
                @dayclick="handleDateSelect"
                @click="handleEventClick"
                :masks="{ title: 'MMMM YYYY' }"
                :locale="'es'"
            />
        </div>
    </ViewWrapper>
</template>

<style>
.custom-calendar {
    --vc-font-family: inherit;
    --vc-rounded-lg: 0.5rem;
    --vc-header-padding: 1rem;
    --vc-weekday-color: var(--color-gray-500);
    --vc-weekday-padding: 0.5rem;
    --vc-day-content-height: 2.5rem;
    --vc-day-content-width: 2.5rem;
    --vc-day-content-radius: 9999px;
    --vc-day-content-hover-bg: var(--color-gray-100);
    --vc-today-bg: var(--color-blue-100);
    --vc-today-color: var(--color-blue-800);
}

/* Soporte para modo oscuro */
:root.dark .custom-calendar {
    --vc-bg: var(--color-gray-800);
    --vc-border-color: var(--color-gray-700);
    --vc-header-arrow-color: var(--color-gray-300);
    --vc-header-title-color: var(--color-gray-100);
    --vc-weekday-color: var(--color-gray-400);
    --vc-day-content-color: var(--color-gray-100);
    --vc-day-content-hover-bg: var(--color-gray-700);
    --vc-today-bg: var(--color-blue-900);
    --vc-today-color: var(--color-blue-100);
}
</style>
``` 3. Asegúrate de que la ruta esté configurada en el router: ```javascript //
src/router/index.js { path: '/calendar', name: 'calendar', component: () =>
import('../views/CalendarView.vue') }
