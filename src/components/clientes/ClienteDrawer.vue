<script setup>
import { ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useClientesStore } from "@/stores/clientesStore";

const props = defineProps({
    show: Boolean,
    mode: {
        type: String,
        default: "create",
    },
    cliente: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["update:show"]);

const clientesStore = useClientesStore();
const formData = ref({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    estado: "Activo",
    direccion: "",
    notas: "",
});

watch(
    () => props.cliente,
    (newCliente) => {
        if (newCliente) {
            formData.value = { ...newCliente };
        } else {
            formData.value = {
                nombre: "",
                empresa: "",
                email: "",
                telefono: "",
                estado: "Activo",
                direccion: "",
                notas: "",
            };
        }
    },
    { immediate: true },
);

const handleSubmit = async () => {
    try {
        if (props.mode === "edit") {
            await clientesStore.updateCliente(props.cliente.id, formData.value);
        } else {
            await clientesStore.createCliente(formData.value);
        }
        emit("update:show", false);
    } catch (error) {
        console.error("Error:", error);
    }
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 overflow-hidden z-50">
        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="emit('update:show', false)"
        />

        <!-- Drawer -->
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="w-screen max-w-md">
                <div
                    class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl"
                >
                    <!-- Header -->
                    <div class="px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <div class="flex items-center justify-between">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                {{
                                    mode === "create"
                                        ? "Nuevo Cliente"
                                        : mode === "edit"
                                          ? "Editar Cliente"
                                          : "Ver Cliente"
                                }}
                            </h2>
                            <button
                                @click="emit('update:show', false)"
                                class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon class="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <!-- Form -->
                    <div
                        class="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto"
                    >
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Nombre
                                </label>
                                <input
                                    v-model="formData.nombre"
                                    type="text"
                                    required
                                    :readonly="mode === 'view'"
                                    class="input mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Empresa
                                </label>
                                <input
                                    v-model="formData.empresa"
                                    type="text"
                                    required
                                    :readonly="mode === 'view'"
                                    class="input mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Email
                                </label>
                                <input
                                    v-model="formData.email"
                                    type="email"
                                    required
                                    :readonly="mode === 'view'"
                                    class="input mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Teléfono
                                </label>
                                <input
                                    v-model="formData.telefono"
                                    type="tel"
                                    required
                                    :readonly="mode === 'view'"
                                    class="input mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Estado
                                </label>
                                <select
                                    v-model="formData.estado"
                                    :disabled="mode === 'view'"
                                    class="input mt-1"
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Dirección
                                </label>
                                <textarea
                                    v-model="formData.direccion"
                                    :readonly="mode === 'view'"
                                    rows="3"
                                    class="input mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Notas
                                </label>
                                <textarea
                                    v-model="formData.notas"
                                    :readonly="mode === 'view'"
                                    rows="3"
                                    class="input mt-1"
                                />
                            </div>
                        </form>
                    </div>

                    <!-- Footer -->
                    <div
                        class="flex-shrink-0 px-4 py-4 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900"
                    >
                        <button
                            type="button"
                            class="btn-secondary"
                            @click="emit('update:show', false)"
                        >
                            Cancelar
                        </button>
                        <button
                            v-if="mode !== 'view'"
                            type="submit"
                            class="btn-primary"
                            @click="handleSubmit"
                        >
                            {{ mode === "create" ? "Crear" : "Guardar" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
