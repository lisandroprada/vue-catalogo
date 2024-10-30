<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import SideBar from "./components/layout/SideBar.vue";
import TopBar from "./components/layout/TopBar.vue";
import ChatDrawer from "./components/chat/ChatDrawer.vue";
import { useMenuStore } from "./stores/menuStore";
import { useAuthStore } from "./stores/authStore";

const menuStore = useMenuStore();
const authStore = useAuthStore();
const route = useRoute();

// Determinar si el usuario está autenticado usando el store
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Determinar si la ruta actual es una ruta de autenticación
const isAuthRoute = computed(() => {
    return ["login", "register", "forgot-password"].includes(route.name);
});

// Cargar el token al montar la aplicación
onMounted(() => {
    authStore.loadToken();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SideBar v-if="isAuthenticated && !isAuthRoute" class="z-50" />
        <div
            :class="
                isAuthenticated && !isAuthRoute
                    ? 'main-content pl-16 md:pl-32'
                    : ''
            "
        >
            <TopBar v-if="isAuthenticated && !isAuthRoute" />
            <div :class="isAuthenticated && !isAuthRoute ? 'pt-16' : ''">
                <RouterView />
            </div>
        </div>
        <ChatDrawer v-if="isAuthenticated && !isAuthRoute" />
    </div>
</template>

<style>
.main-content {
    transition: padding-left 0.3s ease;
}
</style>
