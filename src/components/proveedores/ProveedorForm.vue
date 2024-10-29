<template>
    <div class="fixed inset-0 overflow-hidden z-50">
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="closeForm"
        ></div>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="w-screen max-w-md">
                <div
                    class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl"
                >
                    <div class="px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6">
                        <div class="flex items-center justify-between">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                {{
                                    proveedor.id
                                        ? "Editar Proveedor"
                                        : "Nuevo Proveedor"
                                }}
                            </h2>
                            <button
                                @click="closeForm"
                                class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon class="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div
                        class="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto"
                    >
                        <form @submit.prevent="save" class="space-y-6">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Nombre</label
                                >
                                <input
                                    v-model="proveedor.nombre"
                                    type="text"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Empresa</label
                                >
                                <input
                                    v-model="proveedor.empresa"
                                    type="text"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Email</label
                                >
                                <input
                                    v-model="proveedor.email"
                                    type="email"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Teléfono</label
                                >
                                <input
                                    v-model="proveedor.telefono"
                                    type="tel"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div class="flex justify-end gap-3">
                                <button
                                    type="button"
                                    class="btn-secondary"
                                    @click="closeForm"
                                >
                                    Cancelar
                                </button>
                                <button type="submit" class="btn-primary">
                                    {{ proveedor.id ? "Guardar" : "Agregar" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    proveedor: {
        type: Object,
        default: () => ({ nombre: "", empresa: "", email: "", telefono: "" }),
    },
});

const emit = defineEmits(["close", "save"]);

const proveedor = ref({ ...props.proveedor });

watch(
    () => props.proveedor,
    (newProveedor) => {
        proveedor.value = { ...newProveedor };
    },
    { immediate: true },
);

const closeForm = () => {
    emit("close");
};

const save = () => {
    emit("save", proveedor.value);
};
</script>
