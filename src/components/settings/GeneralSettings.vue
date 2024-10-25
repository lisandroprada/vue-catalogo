<template>
    <div class="card mt-6">
        <div class="card-header">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Configuraciones Generales
            </h2>
        </div>
        <div class="card-body">
            <form @submit.prevent="saveSettings">
                <div class="mb-4">
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Nombre de la Aplicación</label
                    >
                    <input
                        v-model="settings.appName"
                        type="text"
                        class="input mt-1"
                    />
                </div>
                <div class="mb-4">
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Correo Electrónico de Soporte</label
                    >
                    <input
                        v-model="settings.supportEmail"
                        type="email"
                        class="input mt-1"
                    />
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="btn-primary">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const settings = ref({
    appName: "Mi Aplicación",
    supportEmail: "soporte@miapp.com",
});

const saveSettings = () => {
    // Lógica para guardar configuraciones
    console.log("Configuraciones guardadas:", settings.value);
};
</script>
