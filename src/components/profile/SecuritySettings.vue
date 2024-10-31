<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Configuración de Seguridad</h2>
        <form @submit.prevent="updateSecuritySettings">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Autenticación de Dos Factores</label
                >
                <input
                    v-model="settings.twoFactorAuth"
                    type="checkbox"
                    class="input mt-1"
                />
            </div>
            <button type="submit" class="btn-primary">Guardar Cambios</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const settings = ref({
    twoFactorAuth: false,
});

const updateSecuritySettings = async () => {
    // Lógica para actualizar la configuración de seguridad
    console.log("Actualizando configuración de seguridad...");
};
</script>
