<template>
    <div>
        <div class="tabs">
            <nav class="flex space-x-4" aria-label="Tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.name"
                    @click="activeTab = tab"
                    :class="[
                        activeTab.name === tab.name
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <component :is="tab.icon" class="h-5 w-5" />
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <div class="mt-6">
            <component :is="activeTab.component" v-bind="activeTab.props" />
        </div>
    </div>
</template>

<script setup>
import { shallowRef, toRefs } from "vue";

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    },
});

const { tabs } = toRefs(props);
const activeTab = shallowRef(tabs.value[0]);
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
