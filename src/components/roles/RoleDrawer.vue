<template>
    <div v-if="show" class="fixed inset-0 overflow-hidden z-50">
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="emit('update:show', false)"
        />
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
                                    mode === "create"
                                        ? "Nuevo Rol"
                                        : "Editar Rol"
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
                    <div
                        class="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto"
                    >
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Nombre</label
                                >
                                <input
                                    v-model="formData.name"
                                    type="text"
                                    required
                                    class="input mt-1"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Descripción</label
                                >
                                <textarea
                                    v-model="formData.description"
                                    rows="3"
                                    class="input mt-1"
                                ></textarea>
                            </div>
                            <div class="flex justify-end gap-3">
                                <button
                                    type="button"
                                    class="btn-secondary"
                                    @click="emit('update:show', false)"
                                >
                                    Cancelar
                                </button>
                                <button type="submit" class="btn-primary">
                                    {{
                                        mode === "create" ? "Crear" : "Guardar"
                                    }}
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
    show: Boolean,
    mode: {
        type: String,
        default: "create",
    },
    role: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["update:show"]);

const formData = ref({
    name: "",
    description: "",
});

watch(
    () => props.role,
    (newRole) => {
        if (newRole) {
            formData.value = { ...newRole };
        } else {
            formData.value = {
                name: "",
                description: "",
            };
        }
    },
    { immediate: true },
);

const handleSubmit = () => {
    if (props.mode === "edit") {
        // Lógica para actualizar rol
        console.log("Rol actualizado:", formData.value);
    } else {
        // Lógica para crear rol
        console.log("Rol creado:", formData.value);
    }
    emit("update:show", false);
};
</script>
