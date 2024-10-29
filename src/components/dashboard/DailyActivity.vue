<template>
    <div
        class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6"
    >
        <h3 class="text-lg font-semibold mb-4">Actividad Diaria</h3>
        <div>
            <ul class="flex border-b">
                <li class="-mb-px mr-1">
                    <a
                        class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
                        @click="activeTab = 'comprobantes'"
                        :class="{
                            'border-b-2 border-blue-500':
                                activeTab === 'comprobantes',
                        }"
                        >Comprobantes</a
                    >
                </li>
                <li class="mr-1">
                    <a
                        class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        @click="activeTab = 'vencimientos'"
                        :class="{
                            'border-b-2 border-blue-500':
                                activeTab === 'vencimientos',
                        }"
                        >Vencimientos</a
                    >
                </li>
                <li class="mr-1">
                    <a
                        class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
                        @click="activeTab = 'morosos'"
                        :class="{
                            'border-b-2 border-blue-500':
                                activeTab === 'morosos',
                        }"
                        >Morosos</a
                    >
                </li>
            </ul>
            <div v-if="activeTab === 'comprobantes'">
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li
                        v-for="item in comprobantes"
                        :key="item.id"
                        class="py-4"
                    >
                        <div class="text-gray-900 dark:text-white">
                            {{ item.type }}
                        </div>
                        <div class="text-gray-500 dark:text-gray-400">
                            {{ item.description }} ({{ item.date }})
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 'vencimientos'">
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li
                        v-for="item in vencimientos"
                        :key="item.id"
                        class="py-4"
                    >
                        <div class="text-gray-900 dark:text-white">
                            {{ item.description }}
                        </div>
                        <div class="text-gray-500 dark:text-gray-400">
                            {{ item.date }}
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="activeTab === 'morosos'">
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li v-for="item in morosos" :key="item.id" class="py-4">
                        <div class="text-gray-900 dark:text-white">
                            {{ item.name }}
                        </div>
                        <div class="text-gray-500 dark:text-gray-400">
                            {{ item.amount }} ({{ item.dueDate }})
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    comprobantes: Array,
    vencimientos: Array,
    morosos: Array,
});

const activeTab = ref("comprobantes");
</script>
