<script setup>
import { shallowRef } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import GeneralSettings from "@/components/settings/GeneralSettings.vue";
import UserManagement from "@/components/settings/UserManagement.vue";
import RoleManagement from "@/components/settings/RoleManagement.vue";
import PermissionManagement from "@/components/settings/PermissionManagement.vue";
import CommunicationsSettings from "@/components/settings/CommunicationsSettings.vue";
import {
    Cog6ToothIcon,
    UserGroupIcon,
    BriefcaseIcon,
    ShieldCheckIcon,
    EnvelopeIcon,
} from "@heroicons/vue/24/outline";

const title = "Configuraciones";
const subtitle = "Administra las configuraciones del sistema";

const tabs = shallowRef([
    { name: "Generales", icon: Cog6ToothIcon, component: GeneralSettings },
    { name: "Usuarios", icon: UserGroupIcon, component: UserManagement },
    { name: "Roles", icon: BriefcaseIcon, component: RoleManagement },
    {
        name: "Permisos",
        icon: ShieldCheckIcon,
        component: PermissionManagement,
    },
    {
        name: "Comunicaciones",
        icon: EnvelopeIcon,
        component: CommunicationsSettings,
    },
]);

const activeTab = shallowRef(tabs.value[0]);
</script>

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

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
