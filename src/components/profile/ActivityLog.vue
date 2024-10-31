<template>
    <div>
        <h2 class="text-xl font-bold mb-4">Log de Actividades</h2>
        <ul>
            <li v-for="activity in activities" :key="activity.id" class="mb-2">
                {{ activity.description }} - {{ activity.date }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const activities = ref([]);

const fetchActivityLog = async () => {
    // Lógica para obtener el log de actividades
    activities.value = [
        { id: 1, description: "Inicio de sesión", date: "2023-10-01" },
        { id: 2, description: "Cambio de contraseña", date: "2023-10-02" },
        // Más actividades...
    ];
};

onMounted(() => {
    fetchActivityLog();
});
</script>
