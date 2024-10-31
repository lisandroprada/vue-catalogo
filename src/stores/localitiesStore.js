import { defineStore } from "pinia";
import apiClient from "@/api/axios";

export const useLocalitiesStore = defineStore("localities", {
  state: () => ({
    localities: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchLocalitiesByProvince(provinceId) {
      this.isLoading = true;
      try {
        const response = await apiClient.get(`/locality/byId/${provinceId}`);
        this.localities = response.data;
        return this.localities;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching localities:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
