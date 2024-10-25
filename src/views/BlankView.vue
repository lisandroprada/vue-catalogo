<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import { ref } from "vue";
import { HomeIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

const title = ref("Blank Page");
const subtitle = ref("Esta página está en construcción");
</script>

<template>
    <ViewWrapper :title="title" :subtitle="subtitle">
        <template #actions>
            <!-- Aquí puedes agregar botones de acción si es necesario -->
        </template>

        <div
            class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center"
        >
            <h2
                class="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
            >
                🚧 En Construcción 🚧
            </h2>
            <p class="text-gray-700 dark:text-gray-300">
                Estamos trabajando en esta página. Vuelve pronto para ver las
                actualizaciones.
            </p>
        </div>
    </ViewWrapper>
</template>
