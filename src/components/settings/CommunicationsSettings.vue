<template>
    <div class="card mt-6">
        <div class="card-header flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">
                Configuración de Comunicación
            </h2>
            <ChatBubbleLeftRightIcon
                class="h-6 w-6 text-gray-500 dark:text-gray-400"
            />
        </div>
        <div class="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmailSettings @save="handleSaveEmailSettings" />
            <SocialMediaSettings @save="handleSaveSocialMediaSettings" />
            <MessagingSettings @save="handleSaveMessagingSettings" />
        </div>
    </div>
</template>

<script setup>
import EmailSettings from "@/components/settings/EmailSettings.vue";
import SocialMediaSettings from "@/components/settings/SocialMediaSettings.vue";
import MessagingSettings from "@/components/settings/MessagingSettings.vue";
import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";

const handleSaveEmailSettings = (settings) => {
    console.log("Email settings saved:", settings);
    // Lógica para guardar configuraciones de correo
};

const handleSaveSocialMediaSettings = (settings) => {
    console.log("Social media settings saved:", settings);
    // Lógica para guardar configuraciones de redes sociales
};

const handleSaveMessagingSettings = (settings) => {
    console.log("Messaging settings saved:", settings);
    // Lógica para guardar configuraciones de mensajería
};
</script>
