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
                                    movimiento.id
                                        ? "Editar Movimiento"
                                        : "Nuevo Movimiento"
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
                                    >Fecha</label
                                >
                                <input
                                    v-model="movimiento.fecha"
                                    type="date"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Descripción</label
                                >
                                <input
                                    v-model="movimiento.descripcion"
                                    type="text"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Monto</label
                                >
                                <input
                                    v-model="movimiento.monto"
                                    type="number"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Tipo</label
                                >
                                <select
                                    v-model="movimiento.tipo"
                                    required
                                    class="input mt-1"
                                >
                                    <option value="Ingreso">Ingreso</option>
                                    <option value="Egreso">Egreso</option>
                                </select>
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
                                    {{ movimiento.id ? "Guardar" : "Agregar" }}
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
    movimiento: {
        type: Object,
        default: () => ({
            fecha: "",
            descripcion: "",
            monto: "",
            tipo: "Ingreso",
        }),
    },
});

const emit = defineEmits(["close", "save"]);

const movimiento = ref({ ...props.movimiento });

watch(
    () => props.movimiento,
    (newMovimiento) => {
        movimiento.value = { ...newMovimiento };
    },
    { immediate: true },
);

const closeForm = () => {
    emit("close");
};

const save = () => {
    emit("save", movimiento.value);
};
</script>
