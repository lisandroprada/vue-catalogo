<script setup>
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(["update:show"]);

const messages = ref([
    { id: 1, text: "Hola, ¿cómo estás?", sender: "other" },
    { id: 2, text: "¡Hola! Estoy bien, ¿y tú?", sender: "me" },
]);

const newMessage = ref("");

const sendMessage = () => {
    if (newMessage.value.trim() !== "") {
        messages.value.push({
            id: Date.now(),
            text: newMessage.value,
            sender: "me",
        });
        newMessage.value = "";
    }
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 overflow-hidden z-50">
        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="emit('update:show', false)"
        />

        <!-- Drawer -->
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="w-screen max-w-md">
                <div
                    class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl"
                >
                    <!-- Header -->
                    <div class="px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <div class="flex items-center justify-between">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                Chat
                            </h2>
                            <button
                                @click="emit('update:show', false)"
                                class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon class="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <!-- Chat Messages -->
                    <div class="flex-1 overflow-y-auto p-4 space-y-4">
                        <div
                            v-for="message in messages"
                            :key="message.id"
                            :class="{
                                'text-right': message.sender === 'me',
                                'text-left': message.sender === 'other',
                            }"
                        >
                            <div
                                :class="{
                                    'bg-blue-500 text-white':
                                        message.sender === 'me',
                                    'bg-gray-200 text-gray-900':
                                        message.sender === 'other',
                                }"
                                class="inline-block px-4 py-2 rounded-lg"
                            >
                                {{ message.text }}
                            </div>
                        </div>
                    </div>

                    <!-- Message Input -->
                    <div class="px-4 py-4 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <div class="flex items-center space-x-4">
                            <input
                                v-model="newMessage"
                                type="text"
                                placeholder="Escribe un mensaje..."
                                class="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                            />
                            <button @click="sendMessage" class="btn-primary">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
