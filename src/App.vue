<script setup>
import SideBar from "./components/layout/SideBar.vue";
import TopBar from "./components/layout/TopBar.vue";
import Footer from "./components/layout/Footer.vue";
import { useMenuStore } from "./stores/menuStore";
import { watch } from "vue";

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
        <SideBar />
        <div class="md:ml-32">
            <TopBar />
            <div class="pt-16">
                <RouterView />
            </div>
        </div>
    </div>
</template>
