<template>
    <ViewWrapper :title="isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'">
        <div class="bg-white shadow-md rounded-lg p-6">
            <div class="tabs">
                <nav class="flex space-x-4" aria-label="Tabs">
                    <button
                        v-for="tab in tabs"
                        :key="tab.name"
                        @click="activeTab = tab"
                        :class="[
                            activeTab.name === tab.name
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                            'px-3 py-2 font-medium text-sm rounded-md flex items-center gap-2',
                        ]"
                    >
                        <component :is="tab.icon" class="h-5 w-5" />
                        {{ tab.name }}
                    </button>
                </nav>
            </div>

            <div class="mt-4">
                <component
                    :is="activeTab.component"
                    :form="form"
                    :provinces="provinces"
                    :localities="localities"
                    @province-changed="handleProvinceChange"
                />
            </div>
        </div>
    </ViewWrapper>
</template>

<script setup>
import { ref, onMounted, watch, shallowRef } from "vue";
import { useRoute } from "vue-router";
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import ClienteGeneralForm from "@/components/clientes/ClienteGeneralForm.vue";
import ClienteContactTab from "@/components/clientes/ClienteContactTab.vue";
import ClienteDashboardTab from "@/components/clientes/ClienteDashboardTab.vue";
import ClienteBankInfoTab from "@/components/clientes/ClienteBankInfoTab.vue";
import ClientePropertiesTab from "@/components/clientes/ClientePropertiesTab.vue";
import ClienteCommunicationsTab from "@/components/clientes/ClienteCommunicationsTab.vue";
import CuentaForm from "@/components/clientes/account-status/CuentaForm.vue";
import { useClientesStore } from "@/stores/clientesStore";
import { useProvincesStore } from "@/stores/provincesStore";
import { useLocalitiesStore } from "@/stores/localitiesStore";
import {
    UserIcon,
    MapIcon,
    PhoneIcon,
    DocumentTextIcon,
    ChatBubbleLeftRightIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const clientesStore = useClientesStore();
const provincesStore = useProvincesStore();
const localitiesStore = useLocalitiesStore();
const isEditMode = ref(false);
const form = ref({
    name: "",
    lastName: "",
    gender: "",
    identityCard: "",
    taxId: "",
    taxType: "",
    taxAddress: "",
    billing: false,
    email: "",
    phone: [{ number: "", type: "other" }],
    address: "",
    province: "",
    locality: "",
    bankAccounts: [{ bank: "", cbu: "", description: "" }],
});
const provinces = ref([]);
const localities = ref([]);

const tabs = shallowRef([
    { name: "Dashboard", icon: UserIcon, component: ClienteDashboardTab },
    { name: "Estado de Cuenta", icon: MapIcon, component: CuentaForm },
    { name: "General", icon: UserIcon, component: ClienteGeneralForm },
    { name: "Contacto", icon: PhoneIcon, component: ClienteContactTab },
    { name: "Bancos", icon: MapIcon, component: ClienteBankInfoTab },
    {
        name: "Propiedades",
        icon: DocumentTextIcon,
        component: ClientePropertiesTab,
    },
    {
        name: "Comunicaciones",
        icon: ChatBubbleLeftRightIcon,
        component: ClienteCommunicationsTab,
    },
]);

const activeTab = shallowRef(tabs.value[0]);

onMounted(async () => {
    const clienteId = route.params.id;
    if (clienteId) {
        isEditMode.value = true;
        await clientesStore.fetchClienteById(clienteId);
        form.value = { ...clientesStore.cliente };
        await loadProvinces();
        if (form.value.province) {
            await loadLocalities(form.value.province);
        }
    } else {
        isEditMode.value = false;
        await loadProvinces();
    }
});

watch(
    () => route.params.id,
    async (newId) => {
        if (newId) {
            isEditMode.value = true;
            await clientesStore.fetchClienteById(newId);
            form.value = { ...clientesStore.cliente };
            await loadProvinces();
            if (form.value.province) {
                await loadLocalities(form.value.province);
            }
        } else {
            isEditMode.value = false;
            await loadProvinces();
        }
    },
);

const loadProvinces = async () => {
    provinces.value = await provincesStore.fetchProvinces();
};

const loadLocalities = async (provinceId) => {
    if (provinceId) {
        localities.value =
            await localitiesStore.fetchLocalitiesByProvince(provinceId);
    } else {
        localities.value = [];
    }
};

const handleProvinceChange = async (provinceId) => {
    form.value.locality = ""; // Reset locality when province changes
    await loadLocalities(provinceId);
};
</script>

<style scoped>
.tabs {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
</style>
