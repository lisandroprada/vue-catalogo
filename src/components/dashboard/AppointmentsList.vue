<template>
    <div
        class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6"
    >
        <h3 class="text-lg font-semibold mb-4">Recordatorios de Citas</h3>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li
                v-for="appointment in appointments"
                :key="appointment.id"
                class="py-4"
            >
                <div class="text-gray-900 dark:text-white">
                    {{ appointment.description }}
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                    {{ appointment.date }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    appointments: Array,
});
</script>
