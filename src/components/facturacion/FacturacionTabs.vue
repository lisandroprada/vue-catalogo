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
                    @click="activeTab = 'comprobantes'"
                    :class="[
                        activeTab === 'comprobantes'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <DocumentDuplicateIcon class="h-5 w-5" />
                    Comprobantes
                </button>
                <button
                    @click="activeTab = 'facturas'"
                    :class="[
                        activeTab === 'facturas'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                        'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                    ]"
                >
                    <CurrencyDollarIcon class="h-5 w-5" />
                    Facturas
                </button>
            </nav>
        </div>
        <div class="tab-content mt-6">
            <FacturacionDashboard v-if="activeTab === 'dashboard'" />
            <ComprobantesList v-if="activeTab === 'comprobantes'" />
            <FacturasList v-if="activeTab === 'facturas'" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import FacturacionDashboard from "./FacturacionDashboard.vue";
import ComprobantesList from "./ComprobantesList.vue";
import FacturasList from "./FacturasList.vue";
import {
    ChartBarIcon,
    DocumentDuplicateIcon,
    CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

const activeTab = ref("dashboard");
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
