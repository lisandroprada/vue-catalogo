import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios"; // Cambiamos la importación de apiClient por axios

export const usePropiedadesStore = defineStore("propiedades", () => {
  const propiedades = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPropiedades = async () => {
    loading.value = true;
    try {
      const response = await axios.get("http://localhost:3002/api/properties");
      propiedades.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createPropiedad = async (formData, method, url) => {
    loading.value = true;
    try {
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (method === "post") {
        propiedades.value.push(response.data);
      }
      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deletePropiedad = async (id) => {
    loading.value = true;
    try {
      await axios.delete(`http://localhost:3002/api/properties/${id}`);
      propiedades.value = propiedades.value.filter((p) => p._id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    propiedades,
    loading,
    error,
    fetchPropiedades,
    createPropiedad,
    deletePropiedad,
  };
});
