<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Configuración de Privacidad</h2>
        <form @submit.prevent="updatePrivacySettings">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Perfil Público</label
                >
                <input
                    v-model="settings.publicProfile"
                    type="checkbox"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Mostrar Email</label
                >
                <input
                    v-model="settings.showEmail"
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
    publicProfile: false,
    showEmail: false,
});

const updatePrivacySettings = async () => {
    // Lógica para actualizar la configuración de privacidad
    console.log("Actualizando configuración de privacidad...");
};
</script>
