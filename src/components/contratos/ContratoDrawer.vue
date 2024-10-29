<script setup>
import { ref, watch } from "vue";
import { useContratosStore } from "@/stores/contratosStore";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    show: Boolean,
    mode: String,
    contrato: Object,
});

const emit = defineEmits(["update:show"]);

const contratosStore = useContratosStore();
const form = ref({
    cliente: "",
    propiedad: "",
    fecha: "",
    tipoIncremento: "",
});

watch(
    () => props.contrato,
    (newContrato) => {
        if (newContrato) {
            form.value = { ...newContrato };
        } else {
            form.value = {
                cliente: "",
                propiedad: "",
                fecha: "",
                tipoIncremento: "",
            };
        }
    },
    { immediate: true },
);

const handleSave = () => {
    if (props.mode === "create") {
        contratosStore.addContrato(form.value);
    } else if (props.mode === "edit") {
        contratosStore.updateContrato(form.value);
    }
    emit("update:show", false);
};

const handleClose = () => {
    emit("update:show", false);
};
</script>

<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-end"
    >
        <div class="bg-white w-96 p-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">
                    {{
                        mode === "create" ? "Nuevo Contrato" : "Editar Contrato"
                    }}
                </h2>
                <button @click="handleClose" class="btn-icon">
                    <XMarkIcon class="h-6 w-6" />
                </button>
            </div>
            <form @submit.prevent="handleSave">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Cliente</label
                    >
                    <input
                        v-model="form.cliente"
                        type="text"
                        class="input"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Propiedad</label
                    >
                    <input
                        v-model="form.propiedad"
                        type="text"
                        class="input"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Fecha</label
                    >
                    <input
                        v-model="form.fecha"
                        type="date"
                        class="input"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700"
                        >Tipo de Incremento</label
                    >
                    <input
                        v-model="form.tipoIncremento"
                        type="text"
                        class="input"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button type="submit" class="btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>
