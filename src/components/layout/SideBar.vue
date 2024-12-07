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
                <template v-for="item in filteredNavigation" :key="item.name">
                    <RouterLink
                        v-if="item.href"
                        :to="item.href"
                        :class="[
                            isRouteActive(item.href)
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                            'h-16 flex flex-col items-center justify-center transition-colors duration-200 text-[12px]',
                        ]"
                        @click="
                            item.submenu
                                ? openSubmenu(item.name.toLowerCase())
                                : closeSubmenu()
                        "
                        class="submenu-trigger"
                    >
                        <component :is="item.icon" class="h-6 w-6" />
                        <span
                            v-if="isOpen"
                            class="text-xs mt-1 text-center px-1"
                            >{{ item.name }}</span
                        >
                    </RouterLink>
                </template>
            </nav>

            <!-- Users and Settings at bottom -->
            <RouterLink
                v-if="isAdmin"
                to="/users"
                :class="[
                    isRouteActive('/users')
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                    'h-16 flex flex-col items-center justify-center transition-colors duration-200 text-[12px]',
                    'border-t border-gray-200 dark:border-gray-700',
                ]"
            >
                <UsersIcon class="h-6 w-6" />
                <span v-if="isOpen" class="text-xs mt-1">Usuarios</span>
            </RouterLink>

            <RouterLink
                v-if="isAdmin"
                to="/settings"
                :class="[
                    isRouteActive('/settings')
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                    'h-16 flex flex-col items-center justify-center transition-colors duration-200 text-[12px]',
                    'border-t border-gray-200 dark:border-gray-700',
                ]"
            >
                <Cog6ToothIcon class="h-6 w-6" />
                <span v-if="isOpen" class="text-xs mt-1">Settings</span>
            </RouterLink>
        </div>

        <!-- Submenu Drawer -->
        <Teleport to="body">
            <div
                v-if="activeSubmenu"
                class="submenu-drawer fixed inset-y-0 left-32 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform transform z-50"
                :class="{
                    'translate-x-0': activeSubmenu,
                    '-translate-x-full': !activeSubmenu,
                }"
            >
                <div class="h-full flex flex-col">
                    <div
                        class="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4"
                    >
                        <span class="text-lg font-bold">{{
                            activeSubmenu.charAt(0).toUpperCase() +
                            activeSubmenu.slice(1)
                        }}</span>
                        <button
                            @click="closeSubmenu"
                            class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        >
                            <XMarkIcon class="h-6 w-6" />
                        </button>
                    </div>
                    <nav class="flex-1 pt-2">
                        <RouterLink
                            v-for="item in submenus[activeSubmenu]"
                            :key="item.name"
                            :to="item.href"
                            :class="[
                                isRouteActive(item.href)
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-gray-200',
                                'block px-4 py-2 transition-colors duration-200 text-[12px]',
                            ]"
                            @click="closeSubmenu"
                        >
                            <component
                                :is="item.icon"
                                class="h-5 w-5 inline-block mr-2"
                            />
                            {{ item.name }}
                        </RouterLink>
                    </nav>
                </div>
            </div>
        </Teleport>
    </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";
import { useActiveRoute } from "@/composables/useActiveRoute";
import { useAuthStore } from "@/stores/authStore";
import {
    HomeIcon,
    UserGroupIcon,
    FolderIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    TruckIcon,
    BanknotesIcon,
    XMarkIcon,
    UsersIcon,
    DocumentDuplicateIcon,
} from "@heroicons/vue/24/outline";

const menuStore = useMenuStore();
const authStore = useAuthStore();
const { isRouteActive } = useActiveRoute();

// Computed properties para roles
const userRoles = computed(() => authStore.roles || []);
const isAdmin = computed(() => userRoles.value.includes("admin"));

const navigation = [
    {
        name: "Dashboard",
        icon: HomeIcon,
        href: "/",
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "Clientes",
        icon: UserGroupIcon,
        href: "/clientes",
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "Propiedades",
        icon: BuildingOfficeIcon,
        href: "/propiedades",
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "Reports",
        icon: ChartBarIcon,
        href: "/reports",
        roles: ["admin", "super-user"],
    },
    {
        name: "Créditos",
        icon: CurrencyDollarIcon,
        href: "/creditos",
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "Aplicaciones",
        icon: FolderIcon,
        href: "#",
        submenu: true,
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "CRM",
        icon: UserGroupIcon,
        href: "/crm",
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "Tassación",
        icon: UserGroupIcon,
        href: "/tasacion",
        roles: ["admin", "super-user", "user"],
    },
    {
        name: "Blank Page",
        icon: DocumentTextIcon,
        href: "/blank",
        roles: ["admin", "super-user", "user"],
    },
];

const submenus = {
    aplicaciones: [
        {
            name: "Contratos",
            href: "/contratos",
            icon: DocumentTextIcon,
            roles: ["admin", "super-user", "user"],
        },
        {
            name: "Proveedores",
            href: "/proveedores",
            icon: TruckIcon,
            roles: ["admin", "super-user", "user"],
        },
        {
            name: "Bancos",
            href: "/bancos",
            icon: BanknotesIcon,
            roles: ["admin", "super-user", "user"],
        },
        {
            name: "Caja",
            href: "/caja",
            icon: CurrencyDollarIcon,
            roles: ["admin", "super-user", "user"],
        },
        {
            name: "Facturación",
            href: "/facturacion",
            icon: DocumentDuplicateIcon,
            roles: ["admin", "super-user", "user"],
        },
    ],
};

// Filtrar navegación basada en roles
const filteredNavigation = computed(() => {
    return navigation.filter((item) =>
        item.roles.some((role) => userRoles.value.includes(role)),
    );
});

const isOpen = ref(true);
const activeSubmenu = ref(null);

const openSubmenu = (menu) => {
    if (activeSubmenu.value === menu) {
        closeSubmenu();
    } else {
        activeSubmenu.value = menu;
        document.body.classList.add("drawer-open");
    }
};

const closeSubmenu = () => {
    activeSubmenu.value = null;
    document.body.classList.remove("drawer-open");
};

const handleClickOutside = (event) => {
    if (
        !event.target.closest(".submenu-drawer") &&
        !event.target.closest(".submenu-trigger")
    ) {
        closeSubmenu();
    }
};

const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
        closeSubmenu();
    }
};

onMounted(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si los necesitas */
</style>
