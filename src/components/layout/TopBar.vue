<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
    Bars3Icon,
    BellIcon,
    UserCircleIcon,
    SunIcon,
    MoonIcon,
    UserIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useMenuStore } from "@/stores/menuStore";
import { useDarkMode } from "@/composables/useDarkMode";
import logoClaro from "@/assets/images/logo.png";
import logoOscuro from "@/assets/images/logo_transparente.png";

const menuStore = useMenuStore();
const notifications = ref(3);
const { isDark, toggleDark } = useDarkMode();
const isProfileMenuOpen = ref(false);
const router = useRouter();

const closeProfileMenu = () => {
    isProfileMenuOpen.value = false;
};

// Simulación de logout
const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("authToken"); // Eliminar el token de autenticación
    router.push("/login"); // Redirigir al usuario a la página de inicio de sesión
};
</script>

<template>
    <header
        class="bg-white dark:bg-gray-800 h-16 fixed w-full top-0 left-0 shadow-sm z-20 text-gray-700 dark:text-gray-200"
    >
        <div class="md:pl-32 h-full flex items-center justify-between">
            <!-- Left side -->
            <div class="flex-1 flex items-center justify-center relative px-4">
                <button
                    @click="menuStore.toggleMenu"
                    class="md:hidden absolute left-4 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                    <Bars3Icon class="h-6 w-6" />
                </button>
                <!-- Logo -->
                <img
                    :src="isDark ? logoOscuro : logoClaro"
                    alt="Logo"
                    class="h-16"
                />
            </div>

            <!-- Right side -->
            <div class="flex items-center gap-4 px-6">
                <!-- Dark mode toggle -->
                <button
                    @click="toggleDark"
                    class="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    <SunIcon v-if="isDark" class="h-6 w-6" />
                    <MoonIcon v-else class="h-6 w-6" />
                </button>

                <!-- Notifications -->
                <button
                    class="relative p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                    <BellIcon class="h-6 w-6" />
                    <span
                        v-if="notifications"
                        class="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-blue-500 text-white rounded-full"
                    >
                        {{ notifications }}
                    </span>
                </button>

                <!-- Profile Dropdown -->
                <div class="relative">
                    <button
                        @click="isProfileMenuOpen = !isProfileMenuOpen"
                        class="flex items-center gap-2 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700"
                    >
                        <UserCircleIcon class="h-8 w-8 flex-shrink-0" />
                        <span class="hidden md:block text-sm whitespace-nowrap"
                            >John Doe</span
                        >
                    </button>

                    <!-- Dropdown Menu -->
                    <div
                        v-if="isProfileMenuOpen"
                        class="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700"
                        @blur="closeProfileMenu"
                    >
                        <!-- User Info -->
                        <div
                            class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                            <p class="text-sm font-medium">John Doe</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                john@example.com
                            </p>
                        </div>

                        <!-- Menu Items -->
                        <RouterLink
                            to="/profile"
                            class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            @click="isProfileMenuOpen = false"
                        >
                            <UserIcon class="h-5 w-5" />
                            <span>Mi Perfil</span>
                        </RouterLink>

                        <RouterLink
                            to="/settings"
                            class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            @click="isProfileMenuOpen = false"
                        >
                            <Cog6ToothIcon class="h-5 w-5" />
                            <span>Configuración</span>
                        </RouterLink>

                        <div
                            class="border-t border-gray-200 dark:border-gray-700 mt-1"
                        >
                            <button
                                @click="handleLogout"
                                class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors duration-200"
                            >
                                <ArrowRightOnRectangleIcon class="h-5 w-5" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Opcional: añadir una animación suave al dropdown */
.absolute {
    transition:
        opacity 0.2s,
        transform 0.2s;
}
</style>
