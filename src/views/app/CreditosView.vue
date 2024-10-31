<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import CreditSimulator from "@/components/creditos/CreditSimulator.vue";
import UvaData from "@/components/creditos/UvaData.vue";
import {
    UserGroupIcon,
    ClipboardDocumentListIcon,
    CheckCircleIcon,
    BriefcaseIcon,
} from "@heroicons/vue/24/outline";

const activeTab = ref("info");
const valorUVA = ref("0.00");
const fechaActualizacion = ref("");

const creditInfo = {
    beneficiaries: [
        "Clientes que cobren sus haberes en BCH.",
        "Clientes con actividades económicas independientes.",
        "Personas en relación de dependencia sin acreditación de haberes en BCH.",
    ],
    conditions: [
        "Beneficiarios 1 y 2: TNA fija de 3,50%.",
        "Beneficiarios 3: TNA fija de 8%.",
    ],
    requirements: [
        "Ser mayor de edad.",
        "No superar los 65 años en el momento de otorgamiento, ni los 75 años al finalizar el préstamo.",
        "Antigüedad laboral de un año para empleados en relación de dependencia o autónomos.",
    ],
    purpose: [
        "Compra de vivienda nueva o usada.",
        "Terminación de obra.",
        "Ampliación o refacción.",
        "Construcción de vivienda.",
    ],
};

async function fetchUVAValue() {
    try {
        const response = await axios.get(
            "https://api.argentinadatos.com/v1/finanzas/indices/uva",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        if (response.data && response.data.length > 0) {
            const latestData = response.data[response.data.length - 1];
            valorUVA.value = latestData.valor.toFixed(2);
            fechaActualizacion.value = new Date(
                latestData.fecha,
            ).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        }
    } catch (error) {
        console.error("Error al obtener el valor de la UVA:", error);
    }
}

onMounted(() => {
    fetchUVAValue();
});
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
                <button
                    @click="activeTab = 'uvaData'"
                    :class="[
                        'px-4 py-2 text-sm rounded-lg',
                        activeTab === 'uvaData'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-600 dark:text-gray-400',
                    ]"
                >
                    Datos UVA
                </button>
            </div>
        </template>

        <div v-if="activeTab === 'info'" class="mt-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            v-for="(
                                beneficiary, index
                            ) in creditInfo.beneficiaries"
                            :key="index"
                        >
                            {{ beneficiary }}
                        </li>
                    </ul>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <ClipboardDocumentListIcon
                            class="h-6 w-6 text-blue-500"
                        />
                        <h3
                            class="text-lg font-medium text-gray-900 dark:text-white"
                        >
                            Préstamos
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
                            v-for="(
                                requirement, index
                            ) in creditInfo.requirements"
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
                            Destinos de los préstamos
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
        </div>

        <div v-if="activeTab === 'simulator'" class="mt-6">
            <CreditSimulator
                :valorUVAProp="valorUVA"
                :fechaActualizacion="fechaActualizacion"
            />
        </div>

        <div v-if="activeTab === 'uvaData'" class="mt-6">
            <UvaData />
        </div>
    </ViewWrapper>
</template>
