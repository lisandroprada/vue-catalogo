<template>
    <transition name="slide">
        <div v-if="show" class="fixed inset-0 flex justify-end z-50">
            <div
                class="drawer bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-80"
            >
                <div
                    class="drawer-header flex justify-between items-center mb-4"
                >
                    <h3
                        class="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                        {{
                            mode === "create"
                                ? "Nuevo Cliente"
                                : "Editar Cliente"
                        }}
                    </h3>
                    <button
                        @click="closeDrawer"
                        class="text-red-500 hover:underline"
                    >
                        Cerrar
                    </button>
                </div>
                <div class="drawer-body">
                    <form @submit.prevent="handleSubmit" class="space-y-4">
                        <div>
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Nombre</label
                            >
                            <input
                                v-model="form.name"
                                id="name"
                                type="text"
                                required
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="lastName"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Apellido</label
                            >
                            <input
                                v-model="form.lastName"
                                id="lastName"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Email</label
                            >
                            <input
                                v-model="form.email"
                                id="email"
                                type="email"
                                required
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="identityCard"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >DNI</label
                            >
                            <input
                                v-model="form.identityCard"
                                id="identityCard"
                                type="text"
                                required
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="agentType"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Tipo de Agente</label
                            >
                            <select
                                v-model="form.agentType"
                                id="agentType"
                                required
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="Client">Cliente</option>
                                <option value="Supplier">Proveedor</option>
                                <option value="Service Company">
                                    Empresa de Servicios
                                </option>
                                <option value="Consortium">Consorcio</option>
                                <option value="Real Estate">
                                    Inmobiliaria
                                </option>
                            </select>
                        </div>
                        <div>
                            <label
                                for="personType"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Tipo de Persona</label
                            >
                            <select
                                v-model="form.personType"
                                id="personType"
                                required
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="Individual">Individual</option>
                                <option value="Legal Entity">
                                    Entidad Legal
                                </option>
                            </select>
                        </div>
                        <div>
                            <label
                                for="gender"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Género</label
                            >
                            <select
                                v-model="form.gender"
                                id="gender"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="Female">Femenino</option>
                                <option value="Male">Masculino</option>
                                <option value="Non-binary">No Binario</option>
                            </select>
                        </div>
                        <div>
                            <label
                                for="maritalStatus"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Estado Civil</label
                            >
                            <input
                                v-model="form.maritalStatus"
                                id="maritalStatus"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="postalCode"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Código Postal</label
                            >
                            <input
                                v-model="form.postalCode"
                                id="postalCode"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="locality"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Localidad</label
                            >
                            <input
                                v-model="form.locality._id"
                                id="locality"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="province"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Provincia</label
                            >
                            <input
                                v-model="form.province._id"
                                id="province"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="address"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Dirección</label
                            >
                            <input
                                v-model="form.address"
                                id="address"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="workAddress"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Dirección de Trabajo</label
                            >
                            <input
                                v-model="form.workAddress"
                                id="workAddress"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="taxId"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >ID Fiscal</label
                            >
                            <input
                                v-model="form.taxId"
                                id="taxId"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="taxType"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Tipo de Impuesto</label
                            >
                            <input
                                v-model="form.taxType"
                                id="taxType"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="taxIdType"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Tipo de ID Fiscal</label
                            >
                            <input
                                v-model="form.taxIdType"
                                id="taxIdType"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="taxAddress"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Dirección Fiscal</label
                            >
                            <input
                                v-model="form.taxAddress"
                                id="taxAddress"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="iva"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >IVA</label
                            >
                            <input
                                v-model="form.iva"
                                id="iva"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="billing"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Facturación</label
                            >
                            <input
                                v-model="form.billing"
                                id="billing"
                                type="checkbox"
                                class="mt-1"
                            />
                        </div>
                        <div>
                            <label
                                for="supplierMask"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Máscara de Proveedor</label
                            >
                            <input
                                v-model="form.supplierMask"
                                id="supplierMask"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="phone"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Teléfono</label
                            >
                            <input
                                v-model="form.phone[0].number"
                                id="phone"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                for="phoneType"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Tipo de Teléfono</label
                            >
                            <select
                                v-model="form.phone[0].type"
                                id="phoneType"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value="home">Casa</option>
                                <option value="work">Trabajo</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label
                                for="active"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Activo</label
                            >
                            <input
                                v-model="form.active"
                                id="active"
                                type="checkbox"
                                class="mt-1"
                            />
                        </div>
                        <div>
                            <label
                                for="user"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >Usuario</label
                            >
                            <input
                                v-model="form.user"
                                id="user"
                                type="text"
                                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            {{ mode === "create" ? "Crear" : "Actualizar" }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { ref, watch } from "vue";
import { useClientesStore } from "@/stores/clientesStore";

export default {
    props: {
        show: Boolean,
        mode: String,
        cliente: Object,
    },
    setup(props, { emit }) {
        const clientesStore = useClientesStore();
        const form = ref({
            name: "",
            lastName: "",
            email: "",
            identityCard: "",
            agentType: "Client",
            personType: "Individual",
            gender: "",
            maritalStatus: "",
            postalCode: "",
            locality: { _id: "" },
            province: { _id: "" },
            address: "",
            workAddress: "",
            taxId: "",
            taxType: "",
            taxIdType: "",
            taxAddress: "",
            iva: "",
            billing: false,
            supplierMask: "",
            phone: [{ number: "", type: "other" }],
            active: true,
            user: "",
        });

        watch(
            () => props.cliente,
            (newCliente) => {
                if (newCliente) {
                    form.value = { ...newCliente };
                }
            },
            { immediate: true, deep: true },
        );

        const handleSubmit = async () => {
            if (props.mode === "create") {
                await clientesStore.createCliente(form.value);
            } else {
                await clientesStore.updateCliente(form.value);
            }
            closeDrawer();
        };

        const closeDrawer = () => {
            emit("update:show", false);
        };

        return {
            form,
            handleSubmit,
            closeDrawer,
        };
    },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
