<script setup>
import SideBar from "./components/layout/SideBar.vue";
import TopBar from "./components/layout/TopBar.vue";
import Footer from "./components/layout/Footer.vue";
import ChatDrawer from "./components/chat/ChatDrawer.vue"; // Importa el ChatDrawer
import { useMenuStore } from "./stores/menuStore";
import { watch, ref } from "vue";

const menuStore = useMenuStore();
const showChatDrawer = ref(false); // Estado para controlar la visibilidad del ChatDrawer

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
        <div class="main-content md:ml-32">
            <TopBar />
            <div class="pt-16">
                <RouterView />
            </div>
        </div>
        <button
            @click="showChatDrawer = true"
            class="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
        >
            Chat
        </button>
        <ChatDrawer v-model:show="showChatDrawer" />
    </div>
</template>
