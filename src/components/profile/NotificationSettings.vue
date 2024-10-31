<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Configuración de Notificaciones</h2>
        <form @submit.prevent="updateNotificationSettings">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Notificaciones por Email</label
                >
                <input
                    v-model="settings.emailNotifications"
                    type="checkbox"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Notificaciones por SMS</label
                >
                <input
                    v-model="settings.smsNotifications"
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
    emailNotifications: false,
    smsNotifications: false,
});

const updateNotificationSettings = async () => {
    // Lógica para actualizar la configuración de notificaciones
    console.log("Actualizando configuración de notificaciones...");
};
</script>
