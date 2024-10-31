<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Autenticación de Dos Factores</h2>
        <form @submit.prevent="enableTwoFactorAuth">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Código de Verificación</label
                >
                <input
                    v-model="verificationCode"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <button type="submit" class="btn-primary">Habilitar 2FA</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const verificationCode = ref("");

const enableTwoFactorAuth = async () => {
    // Lógica para habilitar la autenticación de dos factores
    console.log("Habilitando 2FA...");
};
</script>
