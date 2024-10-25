<script setup>
import { ref } from "vue";
import { useMenuStore } from "@/stores/menuStore";
import { useActiveRoute } from "@/composables/useActiveRoute";
import {
    HomeIcon,
    UserGroupIcon,
    FolderIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

const menuStore = useMenuStore();
const { isRouteActive } = useActiveRoute();

const navigation = [
    {
        name: "Dashboard",
        icon: HomeIcon,
        href: "/",
    },
    {
        name: "Clientes",
        icon: UserGroupIcon,
        href: "/clientes",
    },
    {
        name: "Propiedades", // Nueva opción
        icon: BuildingOfficeIcon,
        href: "/propiedades",
    },
    {
        name: "Calendar",
        icon: CalendarIcon,
        href: "/calendar",
    },
    {
        name: "Reports",
        icon: ChartBarIcon,
        href: "/reports",
    },
    {
        name: "Créditos",
        icon: CurrencyDollarIcon,
        href: "/creditos",
    },
];

const isOpen = ref(true);
</script>

<template>
    <aside
        class="hidden md:flex fixed left-0 top-0 h-full transition-colors duration-200 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
        :class="[isOpen ? 'w-32' : 'w-16']"
    >
        <div class="flex flex-col w-full h-full">
            <!-- Logo area -->
            <div
                class="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center"
            >
                <span v-if="isOpen" class="text-lg font-bold">Dashboard</span>
                <span v-else class="text-lg font-bold">D</span>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 pt-2">
                <RouterLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                        isRouteActive(item.href)
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                        'h-16 flex flex-col items-center justify-center transition-colors duration-200',
                    ]"
                >
                    <component :is="item.icon" class="h-6 w-6" />
                    <span v-if="isOpen" class="text-xs mt-1 text-center px-1">{{
                        item.name
                    }}</span>
                </RouterLink>
            </nav>

            <!-- Settings at bottom -->
            <RouterLink
                to="/settings"
                :class="[
                    isRouteActive('/settings')
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                    'h-16 flex flex-col items-center justify-center transition-colors duration-200',
                    'border-t border-gray-200 dark:border-gray-700',
                ]"
            >
                <Cog6ToothIcon class="h-6 w-6" />
                <span v-if="isOpen" class="text-xs mt-1">Settings</span>
            </RouterLink>
        </div>
    </aside>
</template>
