<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Configuración de Idioma</h2>
        <form @submit.prevent="updateLanguageSettings">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Idioma</label
                >
                <select v-model="settings.language" class="input mt-1">
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                    <!-- Más opciones de idioma... -->
                </select>
            </div>
            <button type="submit" class="btn-primary">Guardar Cambios</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const settings = ref({
    language: "es",
});

const updateLanguageSettings = async () => {
    // Lógica para actualizar la configuración de idioma
    console.log("Actualizando configuración de idioma...");
};
</script>
