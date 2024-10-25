<script setup>
import SideBar from "./components/layout/SideBar.vue";
import TopBar from "./components/layout/TopBar.vue";
import Footer from "./components/layout/Footer.vue";
import ChatDrawer from "./components/chat/ChatDrawer.vue"; // Importa el ChatDrawer
import { useMenuStore } from "./stores/menuStore";
import { watch, ref } from "vue";

const menuStore = useMenuStore();

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
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SideBar class="z-50" />
        <!-- Aumentamos el z-index del SideBar -->
        <div class="main-content" style="margin-left: calc(4rem + 16px)">
            <TopBar />
            <div class="pt-16">
                <RouterView />
            </div>
        </div>
        <ChatDrawer />
    </div>
</template>
