<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Cambiar Email</h2>
        <form @submit.prevent="changeEmail">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Nuevo Email</label
                >
                <input v-model="newEmail" type="email" class="input mt-1" />
            </div>
            <button type="submit" class="btn-primary">Cambiar Email</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";

const newEmail = ref("");

const changeEmail = async () => {
    // Lógica para cambiar el email
    console.log("Cambiando email...");
};
</script>
