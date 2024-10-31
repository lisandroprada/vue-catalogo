import { defineStore } from "pinia";
import apiClient from "@/api/axios";

export const useClientesStore = defineStore("clientes", {
  state: () => ({
    clientes: [],
    cliente: null,
    searchTerm: "",
    searchCriteria: [],
    pageSize: 10,
    page: 0,
    sort: "",
    totalPages: 0,
    isLoading: false,
    error: null,
  }),
  getters: {
    getClientes: (state) => state.clientes,
    getTotalPages: (state) => state.totalPages,
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchClientes() {
      const params = {
        pageSize: this.pageSize,
        page: this.page,
        sort: this.sort,
        search:
          this.searchCriteria.length > 0
            ? { criteria: this.searchCriteria }
            : undefined,
      };

      try {
        const response = await apiClient.get("/party", { params });
        this.clientes = response.data.items;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    },
    async fetchClienteById(id) {
      this.isLoading = true;
      try {
        const response = await apiClient.get(`/party/${id}`);
        this.cliente = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async createCliente(clienteData) {
      try {
        const response = await apiClient.post("/party", clienteData);
        this.clientes.push(response.data);
      } catch (error) {
        console.error("Error creating cliente:", error);
      }
    },
    async updateCliente(clienteData) {
      try {
        const response = await apiClient.patch(
          `/party/${clienteData._id}`,
          clienteData,
        );
        const index = this.clientes.findIndex(
          (cliente) => cliente._id === clienteData._id,
        );
        if (index !== -1) {
          this.clientes[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating cliente:", error);
      }
    },
    async deleteCliente(clienteId) {
      try {
        await apiClient.delete(`/party/${clienteId}`);
        this.clientes = this.clientes.filter(
          (cliente) => cliente._id !== clienteId,
        );
      } catch (error) {
        console.error("Error deleting cliente:", error);
      }
    },
    async generateUniqueId() {
      try {
        const response = await apiClient.post("/party/generate-unique-id");
        return response.data;
      } catch (error) {
        console.error("Error generating unique ID:", error);
        throw error;
      }
    },
    setSearchTerm(term) {
      this.searchTerm = term;
      this.page = 0; // Reset to first page
      this.fetchClientes();
    },
    setSearchCriteria(criteria) {
      this.searchCriteria = criteria;
      this.page = 0; // Reset to first page
      this.fetchClientes();
    },
    setPageSize(size) {
      this.pageSize = size;
      this.page = 0; // Reset to first page
      this.fetchClientes();
    },
    setPage(page) {
      this.page = page;
      this.fetchClientes();
    },
    setSort(sort) {
      this.sort = sort;
      this.fetchClientes();
    },
    prevPage() {
      if (this.page > 0) {
        this.page -= 1;
        this.fetchClientes();
      }
    },
    nextPage() {
      if (this.page < this.totalPages - 1) {
        this.page += 1;
        this.fetchClientes();
      }
    },
  },
});
