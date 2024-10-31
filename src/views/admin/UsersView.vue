<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import UsersList from "@/components/users/UsersList.vue";

const title = "Usuarios";
const subtitle = "Gestión de usuarios del sistema";
</script>

<template>
    <ViewWrapper :title="title" :subtitle="subtitle">
        <UsersList />
    </ViewWrapper>
</template>
