<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import GeneralSettings from "@/components/settings/GeneralSettings.vue";
import UserManagement from "@/components/settings/UserManagement.vue";
import RoleManagement from "@/components/settings/RoleManagement.vue";
import PermissionManagement from "@/components/settings/PermissionManagement.vue";

const title = "Configuraciones";
const subtitle = "Administra las configuraciones del sistema";
</script>

<template>
    <ViewWrapper :title="title" :subtitle="subtitle">
        <GeneralSettings />
        <UserManagement />
        <RoleManagement />
        <PermissionManagement />
    </ViewWrapper>
</template>
