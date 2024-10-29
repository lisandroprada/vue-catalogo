<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SideBar v-if="isAuthenticated && !isAuthRoute" class="z-50" />
        <div
            :class="isAuthenticated && !isAuthRoute ? 'main-content' : ''"
            style="margin-left: calc(8rem); margin-right: 4rem"
        >
            <TopBar v-if="isAuthenticated && !isAuthRoute" />
            <div :class="isAuthenticated && !isAuthRoute ? 'pt-16' : ''">
                <RouterView />
            </div>
        </div>
        <ChatDrawer v-if="isAuthenticated && !isAuthRoute" />
    </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SideBar from "./components/layout/SideBar.vue";
import TopBar from "./components/layout/TopBar.vue";
import ChatDrawer from "./components/chat/ChatDrawer.vue"; // Importa el ChatDrawer
import { useMenuStore } from "./stores/menuStore";
import { useAuthStore } from "./stores/authStore"; // Importa el store de autenticación

const menuStore = useMenuStore();
const authStore = useAuthStore(); // Usa el store de autenticación
const route = useRoute();
const router = useRouter();

// Prevenir scroll cuando el menú móvil está abierto
watch(
    () => menuStore.isMenuOpen,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    },
);

// Determinar si el usuario está autenticado
const isAuthenticated = computed(() => !!localStorage.getItem("authToken"));

// Determinar si la ruta actual es una ruta de autenticación
const isAuthRoute = computed(() => {
    return ["login", "register", "forgot-password"].includes(route.name);
});

// Redirigir a login si no está autenticado
watch(isAuthenticated, (newVal) => {
    if (!newVal && !isAuthRoute.value) {
        router.push({ name: "login" });
    }
});
</script>
