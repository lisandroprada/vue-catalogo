<script setup>
import { ref, watch } from "vue";
import { useCRMStore } from "@/stores/crmStore";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    show: Boolean,
    mode: String,
    crmCase: Object,
});

const emit = defineEmits(["update:show"]);

const crmStore = useCRMStore();
const caseData = ref({ ...props.crmCase });

watch(
    () => props.crmCase,
    (newVal) => {
        caseData.value = { ...newVal };
    },
);

const handleSave = async () => {
    if (props.mode === "create") {
        await crmStore.createCase(caseData.value);
    } else if (props.mode === "edit") {
        await crmStore.updateCase(caseData.value);
    }
    emit("update:show", false);
};

const handleClose = () => {
    emit("update:show", false);
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 overflow-hidden z-[1000]">
        <div
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="handleClose"
        />
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <div class="w-screen max-w-2xl">
                <div
                    class="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl"
                >
                    <div
                        class="flex-shrink-0 px-4 py-6 bg-gray-50 dark:bg-gray-900 sm:px-6"
                    >
                        <div class="flex items-center justify-between">
                            <h2
                                class="text-lg font-medium text-gray-900 dark:text-white"
                            >
                                {{
                                    mode === "create"
                                        ? "Nuevo Caso"
                                        : "Editar Caso"
                                }}
                            </h2>
                            <button
                                @click="handleClose"
                                class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                <XMarkIcon class="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div class="flex-1 overflow-y-scroll px-4 py-6 sm:px-6">
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Título</label
                                >
                                <input
                                    v-model="caseData.title"
                                    type="text"
                                    class="input"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Descripción</label
                                >
                                <textarea
                                    v-model="caseData.description"
                                    class="input"
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Cliente</label
                                >
                                <input
                                    v-model="caseData.client"
                                    type="text"
                                    class="input"
                                />
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >Estado</label
                                >
                                <select v-model="caseData.status" class="input">
                                    <option value="open">Abierto</option>
                                    <option value="in-progress">
                                        En Progreso
                                    </option>
                                    <option value="closed">Cerrado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex-shrink-0 px-4 py-4 bg-gray-50 dark:bg-gray-900 sm:px-6"
                    >
                        <div class="flex justify-end gap-2">
                            <button @click="handleClose" class="btn-secondary">
                                Cancelar
                            </button>
                            <button @click="handleSave" class="btn-primary">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
