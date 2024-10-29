<template>
    <div
        class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6"
    >
        <h3 class="text-lg font-semibold mb-4">Notificaciones y Alertas</h3>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="alert in alerts" :key="alert.id" class="py-4">
                <div class="text-gray-900 dark:text-white">
                    {{ alert.type }}
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                    {{ alert.description }} ({{ alert.date }})
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    alerts: Array,
});
</script>
