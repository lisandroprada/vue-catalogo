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
                                {{ banco.id ? "Editar Banco" : "Nuevo Banco" }}
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
                                    v-model="banco.nombre"
                                    type="text"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Número de Cuenta</label
                                >
                                <input
                                    v-model="banco.numeroCuenta"
                                    type="text"
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
                                    {{ banco.id ? "Guardar" : "Agregar" }}
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
    banco: {
        type: Object,
        default: () => ({ nombre: "", numeroCuenta: "" }),
    },
});

const emit = defineEmits(["close", "save"]);

const banco = ref({ ...props.banco });

watch(
    () => props.banco,
    (newBanco) => {
        banco.value = { ...newBanco };
    },
    { immediate: true },
);

const closeForm = () => {
    emit("close");
};

const save = () => {
    emit("save", banco.value);
};
</script>

<style scoped>
.input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    color: #111827;
}
.input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
.btn-secondary {
    background-color: #e5e7eb;
    color: #111827;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-secondary:hover {
    background-color: #d1d5db;
}
.btn-primary {
    background-color: #3b82f6;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
}
.btn-primary:hover {
    background-color: #2563eb;
}
</style>
