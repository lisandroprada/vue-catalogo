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
                    API Key de Facebook
                </label>
                <input
                    v-model="socialMediaSettings.facebookApiKey"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    API Key de X
                </label>
                <input
                    v-model="socialMediaSettings.xApiKey"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    API Key de LinkedIn
                </label>
                <input
                    v-model="socialMediaSettings.linkedinApiKey"
                    type="text"
                    class="input mt-1"
                />
            </div>
            <div class="mb-4">
                <label
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    API Key de TikTok
                </label>
                <input
                    v-model="socialMediaSettings.tiktokApiKey"
                    type="text"
                    class="input mt-1"
                />
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

const emit = defineEmits(["save"]);

const socialMediaSettings = ref({
    facebookApiKey: "",
    xApiKey: "",
    linkedinApiKey: "",
    tiktokApiKey: "",
});

const saveSettings = () => {
    emit("save", socialMediaSettings.value);
};
</script>
