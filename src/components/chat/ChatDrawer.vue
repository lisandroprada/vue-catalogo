<script setup>
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const conversations = ref([
    {
        id: 1,
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
        unread: true,
        messages: [
            { id: 1, text: "Hola, ¿cómo estás?", sender: "other" },
            { id: 2, text: "¡Hola! Estoy bien, ¿y tú?", sender: "me" },
        ],
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
        unread: false,
        messages: [
            {
                id: 1,
                text: "¿Tienes tiempo para una reunión?",
                sender: "other",
            },
            { id: 2, text: "Sí, claro. ¿Cuándo te viene bien?", sender: "me" },
        ],
    },
]);

const selectedConversation = ref(null);
const newMessage = ref("");

const selectConversation = (conversation) => {
    selectedConversation.value = conversation;
    conversation.unread = false;
};

const sendMessage = () => {
    if (newMessage.value.trim() !== "") {
        selectedConversation.value.messages.push({
            id: Date.now(),
            text: newMessage.value,
            sender: "me",
        });
        newMessage.value = "";
    }
};

const closeDrawer = () => {
    selectedConversation.value = null;
};
</script>

<template>
    <div class="fixed inset-y-0 right-0 flex" style="top: 4rem">
        <!-- Listado de conversaciones -->
        <div
            class="w-16 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col items-center py-4"
        >
            <div
                v-for="conversation in conversations"
                :key="conversation.id"
                @click="selectConversation(conversation)"
                class="relative mb-4 cursor-pointer"
            >
                <img
                    :src="conversation.avatar"
                    alt="Avatar"
                    class="w-10 h-10 rounded-full"
                />
                <span
                    v-if="conversation.unread"
                    class="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"
                ></span>
            </div>
        </div>

        <!-- Drawer de chat -->
        <div
            v-if="selectedConversation"
            class="w-80 bg-white dark:bg-gray-800 shadow-xl flex flex-col"
        >
            <!-- Header -->
            <div
                class="px-4 py-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-between"
            >
                <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ selectedConversation.name }}
                </h2>
                <button
                    @click="closeDrawer"
                    class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                    <XMarkIcon class="h-6 w-6" />
                </button>
            </div>

            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
                <div
                    v-for="message in selectedConversation.messages"
                    :key="message.id"
                    :class="{
                        'text-right': message.sender === 'me',
                        'text-left': message.sender === 'other',
                    }"
                >
                    <div
                        :class="{
                            'bg-blue-500 text-white': message.sender === 'me',
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
            <div class="px-4 py-4 bg-gray-50 dark:bg-gray-900">
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
</template>
