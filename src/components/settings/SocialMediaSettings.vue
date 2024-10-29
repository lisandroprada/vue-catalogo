<template>
    <div>
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
            Configuración de Redes Sociales
        </h3>
        <form @submit.prevent="saveSettings">
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    API Key de WhatsApp
                </label>
                <input
                    v-model="socialMediaSettings.whatsappApiKey"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    API Key de Telegram
                </label>
                <input
                    v-model="socialMediaSettings.telegramApiKey"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4" v-if="socialMediaSettings.whatsappApiKey">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Código QR de WhatsApp
                </label>
                <QRCode :value="socialMediaSettings.whatsappApiKey" />
            </div>
            <div class="mb-4" v-if="socialMediaSettings.telegramApiKey">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Código QR de Telegram
                </label>
                <QRCode :value="socialMediaSettings.telegramApiKey" />
            </div>
            <div class="flex justify-end">
                <button type="submit" class="btn-primary">
                    Guardar Cambios
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import QRCode from "@chenfengyuan/vue-qrcode";

const emit = defineEmits(["save"]);

const socialMediaSettings = ref({
    whatsappApiKey: "",
    telegramApiKey: "",
});

const saveSettings = () => {
    emit("save", socialMediaSettings.value);
};
</script>
