<template>
    <div>
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
            Configuración de Mensajería
        </h3>
        <form @submit.prevent="saveSettings">
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    API Key de WhatsApp
                </label>
                <input
                    v-model="messagingSettings.whatsappApiKey"
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
                    v-model="messagingSettings.telegramApiKey"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Código QR de WhatsApp
                </label>
                <QRCode value="https://wa.me/qr/EXAMPLE" />
            </div>
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Código QR de Telegram
                </label>
                <QRCode value="https://t.me/EXAMPLE" />
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

const messagingSettings = ref({
    whatsappApiKey: "",
    telegramApiKey: "",
});

const saveSettings = () => {
    emit("save", messagingSettings.value);
};
</script>
