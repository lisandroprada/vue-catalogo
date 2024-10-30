import { defineStore } from "pinia";
import apiClient from "@/api/axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    roles: [],
  }),

  getters: {
    hasRole: (state) => (role) => state.roles.includes(role),
    hasAnyRole: (state) => (roles) =>
      roles.some((role) => state.roles.includes(role)),
  },

  actions: {
    loadToken() {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        this.token = token;
        this.user = JSON.parse(userData);
        this.roles = this.user.roles || [];
        this.isAuthenticated = true;
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },

    async login(user, token) {
      this.isAuthenticated = true;
      this.user = user;
      this.token = token;
      this.roles = user.roles || [];

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      router.push({ name: "dashboard" });
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.roles = [];

      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      delete apiClient.defaults.headers.common["Authorization"];

      router.push({ name: "login" });
    },
  },
});
