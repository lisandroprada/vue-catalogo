<template>
    <div class="min-h-full bg-gray-50 dark:bg-gray-900">
        <!-- Breadcrumb -->
        <nav
            class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5"
        >
            <div
                class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            >
                <RouterLink
                    to="/"
                    class="hover:text-blue-600 dark:hover:text-blue-400"
                >
                    <HomeIcon class="h-4 w-4" />
                </RouterLink>

                <template
                    v-for="(crumb, index) in breadcrumbs"
                    :key="crumb.path"
                >
                    <ChevronRightIcon class="h-4 w-4" v-if="index > 0" />
                    <RouterLink
                        :to="crumb.path"
                        :class="[
                            crumb.current
                                ? 'text-gray-700 dark:text-gray-200 font-medium'
                                : 'hover:text-blue-600 dark:hover:text-blue-400',
                        ]"
                    >
                        {{ crumb.name }}
                    </RouterLink>
                </template>
            </div>
        </nav>

        <!-- Main container -->
        <div class="container mx-auto px-2 py-6 w-[90%]">
            <!-- Header -->
            <header class="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h1
                            class="text-2xl font-semibold text-gray-900 dark:text-white"
                        >
                            {{ title }}
                        </h1>
                        <p
                            v-if="subtitle"
                            class="mt-1 text-sm text-gray-500 dark:text-gray-400"
                        >
                            {{ subtitle }}
                        </p>
                    </div>
                    <div>
                        <slot name="actions" />
                    </div>
                </div>
            </header>

            <!-- Main content -->
            <main class="mt-6">
                <div class="max-w-full">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { HomeIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { defineComponent, defineProps } from 'vue';

defineComponent({
    name: 'ViewWrapper'
});

defineProps<{
    title: string;
    subtitle?: string;
}>();

const route = useRoute();

// Generar breadcrumbs basado en la ruta actual
const breadcrumbs = computed(() => {
    const paths = route.path.split("/").filter(Boolean);
    return paths.map((path, index) => ({
        name: path.charAt(0).toUpperCase() + path.slice(1),
        path: "/" + paths.slice(0, index + 1).join("/"),
        current: index === paths.length - 1,
    }));
});
</script>
