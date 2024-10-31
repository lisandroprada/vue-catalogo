<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Configuración de Perfil</h2>
        <form @submit.prevent="updateProfile">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Nombre</label
                >
                <input v-model="user.name" type="text" class="input mt-1" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Apellido</label
                >
                <input v-model="user.username" type="text" class="input mt-1" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Email</label
                >
                <input v-model="user.email" type="email" class="input mt-1" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Teléfono</label
                >
                <input v-model="user.phone" type="tel" class="input mt-1" />
            </div>
            <button type="submit" class="btn-primary">Guardar Cambios</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref({
    name: "",
    username: "",
    email: "",
    phone: "",
    profilePicture: "",
});

const fetchUserData = async () => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users/1",
        );
        user.value = response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

const updateProfile = async () => {
    // Lógica para actualizar el perfil del usuario en el backend
    console.log("Actualizando perfil...");
};

onMounted(() => {
    fetchUserData();
});
</script>
