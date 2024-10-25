// src/stores/clientesStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useClientesStore = defineStore("clientes", () => {
  const clientes = ref([]);
  const filters = ref({
    search: "",
    estado: "",
    empresa: "",
    fechaDesde: "",
    fechaHasta: "",
  });

  const filteredClientes = computed(() => {
    return clientes.value.filter((cliente) => {
      if (filters.value.search) {
        const searchTerm = filters.value.search.toLowerCase();
        if (
          !cliente.nombre.toLowerCase().includes(searchTerm) &&
          !cliente.email.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      if (filters.value.estado && cliente.estado !== filters.value.estado) {
        return false;
      }

      if (
        filters.value.empresa &&
        !cliente.empresa
          .toLowerCase()
          .includes(filters.value.empresa.toLowerCase())
      ) {
        return false;
      }

      // Aquí puedes añadir más filtros según necesites

      return true;
    });
  });

  const createCliente = async (clienteData) => {
    // Aquí iría tu lógica de API
    const newCliente = {
      id: Date.now(), // Temporal, normalmente vendría del backend
      ...clienteData,
      createdAt: new Date().toISOString(),
    };
    clientes.value.push(newCliente);
  };

  const updateCliente = async (id, clienteData) => {
    // Aquí iría tu lógica de API
    const index = clientes.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      clientes.value[index] = { ...clientes.value[index], ...clienteData };
    }
  };

  const deleteCliente = async (id) => {
    // Aquí iría tu lógica de API
    clientes.value = clientes.value.filter((c) => c.id !== id);
  };

  const setFilters = (newFilters) => {
    filters.value = { ...newFilters };
  };

  const resetFilters = () => {
    filters.value = {
      search: "",
      estado: "",
      empresa: "",
      fechaDesde: "",
      fechaHasta: "",
    };
  };

  return {
    clientes,
    filteredClientes,
    filters,
    createCliente,
    updateCliente,
    deleteCliente,
    setFilters,
    resetFilters,
  };
});
