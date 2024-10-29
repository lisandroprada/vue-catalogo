<template>
    <div>
        <div class="tabs">
            <nav class="flex space-x-4" aria-label="Tabs">
                <button
                    @click="activeTab = 'dashboard'"
                    :class="[
                        activeTab === 'dashboard'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <ChartBarIcon class="h-5 w-5" />
                    Dashboard
                </button>
                <button
                    @click="activeTab = 'ingresos'"
                    :class="[
                        activeTab === 'ingresos'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <CurrencyDollarIcon class="h-5 w-5" />
                    Ingresos
                </button>
                <button
                    @click="activeTab = 'egresos'"
                    :class="[
                        activeTab === 'egresos'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <ArrowDownTrayIcon class="h-5 w-5" />
                    Egresos
                </button>
                <button
                    @click="activeTab = 'conciliacion'"
                    :class="[
                        activeTab === 'conciliacion'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <ClipboardDocumentCheckIcon class="h-5 w-5" />
                    Conciliación Bancaria
                </button>
                <button
                    @click="activeTab = 'bancos'"
                    :class="[
                        activeTab === 'bancos'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'ml-auto px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <BanknotesIcon class="h-5 w-5" />
                    Bancos
                </button>
            </nav>
        </div>
        <div class="tab-content mt-6">
            <CajaDashboard v-if="activeTab === 'dashboard'" />
            <IngresosList v-if="activeTab === 'ingresos'" />
            <EgresosList v-if="activeTab === 'egresos'" />
            <ConciliacionBancaria v-if="activeTab === 'conciliacion'" />
            <BancosList v-if="activeTab === 'bancos'" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import CajaDashboard from "./CajaDashboard.vue";
import IngresosList from "./IngresosList.vue";
import EgresosList from "./EgresosList.vue";
import ConciliacionBancaria from "./ConciliacionBancaria.vue";
import BancosList from "./BancosList.vue";
import {
    ChartBarIcon,
    CurrencyDollarIcon,
    ArrowDownTrayIcon,
    ClipboardDocumentCheckIcon,
    BanknotesIcon,
} from "@heroicons/vue/24/outline";

const activeTab = ref("dashboard");
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
