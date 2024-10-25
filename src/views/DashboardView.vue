<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import { ref } from "vue";

const stats = ref([
    {
        name: "Total Subscribers",
        stat: "71,897",
        change: "12%",
        changeType: "increase",
    },
    {
        name: "Avg. Open Rate",
        stat: "58.16%",
        change: "2.02%",
        changeType: "decrease",
    },
    {
        name: "Avg. Click Rate",
        stat: "24.57%",
        change: "3.2%",
        changeType: "increase",
    },
]);
</script>

<template>
    <ViewWrapper
        title="Dashboard"
        subtitle="Una visión general de las métricas principales"
    >
        <template #actions>
            <button class="btn-primary">Exportar Datos</button>
        </template>

        <!-- Content -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="item in stats"
                :key="item.name"
                class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6"
            >
                <div>
                    <p
                        class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"
                    >
                        {{ item.name }}
                    </p>
                    <p
                        class="mt-1 text-3xl font-semibold text-gray-900 dark:text-white"
                    >
                        {{ item.stat }}
                    </p>
                </div>
                <div class="mt-4">
                    <div class="flex items-center">
                        <span
                            :class="[
                                item.changeType === 'increase'
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400',
                            ]"
                            class="text-sm font-medium"
                        >
                            {{ item.change }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </ViewWrapper>
</template>
