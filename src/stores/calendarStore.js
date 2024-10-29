import { defineStore } from "pinia";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    events: [],
  }),
  actions: {
    async fetchEvents() {
      // Lógica para obtener eventos del backend
      const response = await fetch("http://localhost:3002/api/events");
      this.events = await response.json();
    },
    async createEvent(event) {
      // Lógica para crear un nuevo evento
      const response = await fetch("http://localhost:3002/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const newEvent = await response.json();
      this.events.push(newEvent);
    },
    async updateEvent(event) {
      // Lógica para actualizar un evento existente
      const response = await fetch(
        `http://localhost:3002/api/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        },
      );
      const updatedEvent = await response.json();
      const index = this.events.findIndex((e) => e.id === event.id);
      this.events[index] = updatedEvent;
    },
    async deleteEvent(eventId) {
      // Lógica para eliminar un evento
      await fetch(`http://localhost:3002/api/events/${eventId}`, {
        method: "DELETE",
      });
      this.events = this.events.filter((e) => e.id !== eventId);
    },
    filterEventsByDateRange(startDate, endDate) {
      return this.events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
        );
      });
    },
    filterEventsByUser(userId) {
      return this.events.filter((event) => event.userId === userId);
    },
    // Agrega más métodos de filtrado según sea necesario
  },
});
