import { defineStore } from "pinia";
import apiClient from "@/api/axios";

export const useProvincesStore = defineStore("provinces", {
  state: () => ({
    provinces: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProvinces() {
      this.isLoading = true;
      try {
        const response = await apiClient.get("/province");
        this.provinces = response.data;
        return this.provinces;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching provinces:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
