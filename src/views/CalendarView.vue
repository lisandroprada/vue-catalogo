<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import Calendar from "@/components/calendar/Calendar.vue";
import { ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

const showEventForm = ref(false);
const selectedEvent = ref(null);
const events = ref([]);

const handleNewEvent = () => {
    selectedEvent.value = null;
    showEventForm.value = true;
};

const handleEditEvent = (event) => {
    selectedEvent.value = event;
    showEventForm.value = true;
};

const handleDeleteEvent = async (event) => {
    // Lógica para eliminar el evento
    events.value = events.value.filter((e) => e.id !== event.id);
};

const handleSaveEvent = (event) => {
    if (event.id) {
        const index = events.value.findIndex((e) => e.id === event.id);
        events.value[index] = event;
    } else {
        event.id = Date.now();
        events.value.push(event);
    }
    showEventForm.value = false;
};
</script>

<template>
    <ViewWrapper title="Calendario" subtitle="Gestión de citas y eventos">
        <template #actions>
            <button
                @click="handleNewEvent"
                class="btn-primary flex items-center gap-2"
            >
                <PlusIcon class="h-5 w-5" />
                Nueva Cita
            </button>
        </template>

        <div class="calendar-container mx-auto">
            <Calendar
                :events="events"
                @edit="handleEditEvent"
                @delete="handleDeleteEvent"
            />
        </div>

        <EventForm
            v-if="showEventForm"
            :event="selectedEvent"
            @save="handleSaveEvent"
            @close="showEventForm = false"
        />
    </ViewWrapper>
</template>

<style scoped>
.calendar-container {
    width: 33.33%; /* Un tercio de la pantalla */
}
</style>
