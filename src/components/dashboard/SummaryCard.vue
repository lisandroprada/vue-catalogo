<template>
    <article
        class="rounded-lg border border-gray-100 bg-white dark:bg-gray-800 p-6"
    >
        <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</p>
            <p class="text-2xl font-medium text-gray-900 dark:text-white">
                {{ stat }}
            </p>
        </div>
        <div class="mt-1 flex gap-1" :class="trendColor">
            <slot name="icon"></slot>
            <p class="flex gap-2 text-xs">
                <span class="font-medium">{{ trend }}</span>
                <span class="text-gray-500 dark:text-gray-400">{{
                    trendDescription
                }}</span>
            </p>
        </div>
    </article>
</template>

<script setup>
defineProps({
    title: String,
    stat: [String, Number],
    trend: String,
    trendDescription: String,
    trendColor: String,
});
</script>

<style scoped>
/* Agregar estilos adicionales si es necesario */
</style>
