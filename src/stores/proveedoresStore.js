import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProveedoresStore = defineStore("proveedores", () => {
  const proveedores = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProveedores = async () => {
    loading.value = true;
    try {
      const response = await axios.get("http://localhost:3002/api/proveedores");
      proveedores.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createProveedor = async (proveedorData) => {
    loading.value = true;
    try {
      const response = await axios.post(
        "http://localhost:3002/api/proveedores",
        proveedorData,
      );
      proveedores.value.push(response.data);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateProveedor = async (id, proveedorData) => {
    loading.value = true;
    try {
      const response = await axios.put(
        `http://localhost:3002/api/proveedores/${id}`,
        proveedorData,
      );
      const index = proveedores.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        proveedores.value[index] = response.data;
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteProveedor = async (id) => {
    loading.value = true;
    try {
      await axios.delete(`http://localhost:3002/api/proveedores/${id}`);
      proveedores.value = proveedores.value.filter((p) => p.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    proveedores,
    loading,
    error,
    fetchProveedores,
    createProveedor,
    updateProveedor,
    deleteProveedor,
  };
});
