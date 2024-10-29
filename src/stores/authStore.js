import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: !!localStorage.getItem("authToken"),
  }),
  actions: {
    setAuthenticated(authenticated) {
      this.isAuthenticated = authenticated;
    },
  },
});
