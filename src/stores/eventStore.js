import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useEventStore = defineStore("eventStore", () => {
  const events = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchEvents = async () => {
    loading.value = true;
    try {
      const response = await axios.get("http://localhost:3002/api/events");
      events.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createEvent = async (eventData) => {
    loading.value = true;
    try {
      const response = await axios.post(
        "http://localhost:3002/api/events",
        eventData,
      );
      events.value.push(response.data);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateEvent = async (eventData) => {
    loading.value = true;
    try {
      const response = await axios.put(
        `http://localhost:3002/api/events/${eventData.id}`,
        eventData,
      );
      const index = events.value.findIndex((e) => e.id === eventData.id);
      if (index !== -1) {
        events.value[index] = response.data;
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteEvent = async (id) => {
    loading.value = true;
    try {
      await axios.delete(`http://localhost:3002/api/events/${id}`);
      events.value = events.value.filter((e) => e.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
});
