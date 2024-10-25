<script setup>
import { ref } from "vue";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import {
    UserGroupIcon,
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    BriefcaseIcon,
    CalculatorIcon,
} from "@heroicons/vue/24/outline";

const activeTab = ref("info");

const creditInfo = {
    beneficiaries: [
        "Personas naturales mayores de 18 años.",
        "Personas con ingresos demostrables.",
    ],
    conditions: [
        "Tasa de interés fija del 5% anual.",
        "Plazo máximo de 30 años.",
        "Monto máximo del préstamo: $500,000.",
    ],
    requirements: [
        "Identificación oficial.",
        "Comprobante de ingresos.",
        "Historial crediticio.",
    ],
    purpose: [
        "Compra de vivienda.",
        "Construcción de vivienda.",
        "Remodelación de vivienda.",
    ],
};

const simulateCredit = (amount, rate, years) => {
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthlyPayment =
        (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    return monthlyPayment.toFixed(2);
};

const loanAmount = ref(100000);
const interestRate = ref(5);
const loanTerm = ref(30);
const monthlyPayment = ref(
    simulateCredit(loanAmount.value, interestRate.value, loanTerm.value),
);

const handleSimulation = () => {
    monthlyPayment.value = simulateCredit(
        loanAmount.value,
        interestRate.value,
        loanTerm.value,
    );
};
</script>

<template>
    <ViewWrapper
        title="Créditos Hipotecarios"
        subtitle="Información y simulador de créditos hipotecarios"
    >
        <template #actions>
            <div class="flex items-center gap-3">
                <button
                    @click="activeTab = 'info'"
                    :class="[
                        'px-4 py-2 text-sm rounded-lg',
                        activeTab === 'info'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-600 dark:text-gray-400',
                    ]"
                >
                    Información
                </button>
                <button
                    @click="activeTab = 'simulator'"
                    :class="[
                        'px-4 py-2 text-sm rounded-lg',
                        activeTab === 'simulator'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-600 dark:text-gray-400',
                    ]"
                >
                    Simulador
                </button>
            </div>
        </template>

        <div v-if="activeTab === 'info'" class="mt-6 space-y-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center gap-2 mb-4">
                    <UserGroupIcon class="h-6 w-6 text-blue-500" />
                    <h3
                        class="text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Beneficiarios
                    </h3>
                </div>
                <ul
                    class="list-disc list-inside text-gray-700 dark:text-gray-300"
                >
                    <li
                        v-for="(beneficiary, index) in creditInfo.beneficiaries"
                        :key="index"
                    >
                        {{ beneficiary }}
                    </li>
                </ul>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center gap-2 mb-4">
                    <ClipboardDocumentListIcon class="h-6 w-6 text-blue-500" />
                    <h3
                        class="text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Condiciones
                    </h3>
                </div>
                <ul
                    class="list-disc list-inside text-gray-700 dark:text-gray-300"
                >
                    <li
                        v-for="(condition, index) in creditInfo.conditions"
                        :key="index"
                    >
                        {{ condition }}
                    </li>
                </ul>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center gap-2 mb-4">
                    <CheckCircleIcon class="h-6 w-6 text-blue-500" />
                    <h3
                        class="text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Requisitos
                    </h3>
                </div>
                <ul
                    class="list-disc list-inside text-gray-700 dark:text-gray-300"
                >
                    <li
                        v-for="(requirement, index) in creditInfo.requirements"
                        :key="index"
                    >
                        {{ requirement }}
                    </li>
                </ul>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div class="flex items-center gap-2 mb-4">
                    <BriefcaseIcon class="h-6 w-6 text-blue-500" />
                    <h3
                        class="text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Finalidad del Préstamo
                    </h3>
                </div>
                <ul
                    class="list-disc list-inside text-gray-700 dark:text-gray-300"
                >
                    <li
                        v-for="(purpose, index) in creditInfo.purpose"
                        :key="index"
                    >
                        {{ purpose }}
                    </li>
                </ul>
            </div>
        </div>

        <div
            v-if="activeTab === 'simulator'"
            class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
            <div class="flex items-center gap-2 mb-4">
                <CalculatorIcon class="h-6 w-6 text-blue-500" />
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    Simulador de Créditos
                </h3>
            </div>
            <div class="space-y-4">
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Monto del Préstamo ($)</label
                    >
                    <input
                        v-model="loanAmount"
                        type="number"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Tasa de Interés (%)</label
                    >
                    <input
                        v-model="interestRate"
                        type="number"
                        step="0.01"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Plazo (años)</label
                    >
                    <input
                        v-model="loanTerm"
                        type="number"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                    />
                </div>
                <div class="flex justify-end">
                    <button @click="handleSimulation" class="btn-primary">
                        Calcular
                    </button>
                </div>
                <div class="mt-4">
                    <h4
                        class="text-lg font-medium text-gray-900 dark:text-white"
                    >
                        Pago Mensual Estimado:
                    </h4>
                    <p
                        class="text-2xl font-semibold text-blue-600 dark:text-blue-400"
                    >
                        ${{ monthlyPayment }}
                    </p>
                </div>
            </div>
        </div>
    </ViewWrapper>
</template>
