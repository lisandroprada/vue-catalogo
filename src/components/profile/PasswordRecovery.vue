<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Recuperar Contraseña</h2>
        <form @submit.prevent="recoverPassword">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Email</label
                >
                <input v-model="email" type="email" class="input mt-1" />
            </div>
            <button type="submit" class="btn-primary">
                Enviar Email de Recuperación
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

const recoverPassword = async () => {
    // Lógica para enviar email de recuperación
    console.log("Enviando email de recuperación...");
};
</script>
