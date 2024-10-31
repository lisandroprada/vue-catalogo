<template>
    <ViewWrapper :title="title" :subtitle="subtitle">
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
            <component :is="activeTab.component" />
        </div>
    </ViewWrapper>
</template>

<script setup>
import { ref, shallowRef, markRaw } from "vue";
import {
    UserIcon,
    LockClosedIcon,
    BellIcon,
    ShieldCheckIcon,
    GlobeAltIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import ProfileSettings from "@/components/profile/ProfileSettings.vue";
import PasswordRecovery from "@/components/profile/PasswordRecovery.vue";
import EmailChange from "@/components/profile/EmailChange.vue";
import TwoFactorAuth from "@/components/profile/TwoFactorAuth.vue";
import ActivityLog from "@/components/profile/ActivityLog.vue";
import NotificationSettings from "@/components/profile/NotificationSettings.vue";
import PrivacySettings from "@/components/profile/PrivacySettings.vue";
import SecuritySettings from "@/components/profile/SecuritySettings.vue";
import LanguageSettings from "@/components/profile/LanguageSettings.vue";

const title = "Mi Perfil";
const subtitle = "Administra la configuración de tu perfil";

const tabs = shallowRef([
    { name: "Perfil", icon: UserIcon, component: markRaw(ProfileSettings) },
    {
        name: "Recuperar Contraseña",
        icon: LockClosedIcon,
        component: markRaw(PasswordRecovery),
    },
    { name: "Cambiar Email", icon: UserIcon, component: markRaw(EmailChange) },
    { name: "2FA", icon: ShieldCheckIcon, component: markRaw(TwoFactorAuth) },
    {
        name: "Log de Actividades",
        icon: ClipboardDocumentListIcon,
        component: markRaw(ActivityLog),
    },
    {
        name: "Notificaciones",
        icon: BellIcon,
        component: markRaw(NotificationSettings),
    },
    {
        name: "Privacidad",
        icon: ShieldCheckIcon,
        component: markRaw(PrivacySettings),
    },
    {
        name: "Seguridad",
        icon: ShieldCheckIcon,
        component: markRaw(SecuritySettings),
    },
    {
        name: "Idioma",
        icon: GlobeAltIcon,
        component: markRaw(LanguageSettings),
    },
]);

const activeTab = ref(tabs.value[0]);
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
