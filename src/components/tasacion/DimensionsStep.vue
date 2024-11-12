<template>
    <div class="flex space-x-6">
        <div class="space-y-6 w-1/2">
            <h3 class="text-lg font-semibold text-gray-900 border-b pb-2">
                Dimensiones
            </h3>
            <FormInput
                :modelValue="localForm.superficieCubierta"
                @update:modelValue="localForm.superficieCubierta = $event"
                type="number"
                id="superficieCubierta"
                label="Superficie Cubierta (m²)"
            />
            <FormInput
                :modelValue="localForm.superficieSemicubierta"
                @update:modelValue="localForm.superficieSemicubierta = $event"
                type="number"
                id="superficieSemicubierta"
                label="Superficie Semicubierta (m²)"
            />
            <FormInput
                :modelValue="localForm.superficieTotal"
                @update:modelValue="localForm.superficieTotal = $event"
                type="number"
                id="superficieTotal"
                label="Superficie Total del Terreno (m²)"
                readonly
            />
            <div class="grid grid-cols-2 gap-4">
                <FormInput
                    :modelValue="localForm.dormitorios"
                    @update:modelValue="localForm.dormitorios = $event"
                    type="number"
                    id="dormitorios"
                    label="Número de Dormitorios"
                />
                <FormInput
                    :modelValue="localForm.banos"
                    @update:modelValue="localForm.banos = $event"
                    type="number"
                    id="banos"
                    label="Número de Baños"
                />
            </div>
            <FormInput
                :modelValue="localForm.frente"
                @update:modelValue="localForm.frente = $event"
                type="number"
                id="frente"
                label="Medida de Frente (m)"
            />
            <FormInput
                :modelValue="localForm.fondo"
                @update:modelValue="localForm.fondo = $event"
                type="number"
                id="fondo"
                label="Medida de Fondo (m)"
            />
            <FormSelect
                :modelValue="localForm.tipoLote"
                @update:modelValue="localForm.tipoLote = $event"
                label="Tipo de Lote"
                :options="[
                    { value: 'centro', text: 'Centro' },
                    { value: 'esquina', text: 'Esquina' },
                ]"
            />
            <FormSelect
                v-if="localForm.tipoLote === 'esquina'"
                :modelValue="localForm.ochava"
                @update:modelValue="localForm.ochava = $event"
                label="Ubicación de la Ochava"
                :options="[
                    { value: 'izquierda-arriba', text: 'Izquierda Arriba' },
                    { value: 'izquierda-abajo', text: 'Izquierda Abajo' },
                    { value: 'derecha-arriba', text: 'Derecha Arriba' },
                    { value: 'derecha-abajo', text: 'Derecha Abajo' },
                ]"
            />
        </div>
        <div class="w-1/2 flex items-center justify-center">
            <svg
                v-if="localForm.frente && localForm.fondo && localForm.tipoLote"
                :width="svgWidth"
                :height="svgHeight"
                class="border border-gray-400"
            >
                <rect
                    v-if="localForm.tipoLote === 'centro'"
                    :x="padding"
                    :y="padding"
                    :width="frente * scale"
                    :height="fondo * scale"
                    fill="none"
                    stroke="black"
                />
                <polygon
                    v-if="localForm.tipoLote === 'esquina'"
                    :points="ochavaPoints"
                    fill="none"
                    stroke="black"
                />
                <text
                    v-if="localForm.frente && localForm.fondo"
                    :x="padding + (frente * scale) / 2"
                    :y="padding - 10"
                    text-anchor="middle"
                    fill="black"
                >
                    {{ localForm.frente }} m
                </text>
                <text
                    v-if="localForm.frente && localForm.fondo"
                    :x="padding - 10"
                    :y="padding + (fondo * scale) / 2"
                    text-anchor="middle"
                    fill="black"
                    transform="rotate(-90, {{ padding - 10 }}, {{ padding + fondo * scale / 2 }})"
                >
                    {{ localForm.fondo }} m
                </text>
                <text
                    v-if="
                        localForm.tipoLote === 'esquina' &&
                        localForm.frente &&
                        localForm.fondo
                    "
                    :x="ochavaLabelX"
                    :y="ochavaLabelY"
                    text-anchor="middle"
                    fill="black"
                >
                    Ochava
                </text>
                <text
                    v-if="
                        localForm.tipoLote === 'esquina' &&
                        localForm.frente &&
                        localForm.fondo
                    "
                    :x="ochavaCotaX"
                    :y="ochavaCotaY"
                    text-anchor="middle"
                    fill="black"
                >
                    {{ ochavaCota }} m
                </text>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { watch, ref, computed } from "vue";
import FormInput from "@/components/ui/FormInput.vue";
import FormSelect from "@/components/ui/FormSelect.vue";

const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["update:form"]);

const localForm = ref({
    ...props.form,
    frente: props.form.frente || 0,
    fondo: props.form.fondo || 0,
    tipoLote: props.form.tipoLote || "centro",
    ochava: props.form.ochava || "izquierda-arriba",
});

watch(
    localForm,
    (newForm) => {
        emit("update:form", newForm);
    },
    { deep: true },
);

const padding = 40;
const scale = 10; // 1 meter = 20 pixels
const svgWidth = computed(
    () => (localForm.value.frente || 0) * scale + padding * 2,
);
const svgHeight = computed(
    () => (localForm.value.fondo || 0) * scale + padding * 2,
);

const ochavaPoints = computed(() => {
    const frente = (localForm.value.frente || 0) * scale;
    const fondo = (localForm.value.fondo || 0) * scale;
    const ochavaSize = 20; // Size of the ochava in pixels

    switch (localForm.value.ochava) {
        case "izquierda-arriba":
            return `${padding},${padding + ochavaSize} ${padding + ochavaSize},${padding} ${padding + frente},${padding} ${padding + frente},${padding + fondo} ${padding},${padding + fondo}`;
        case "izquierda-abajo":
            return `${padding},${padding} ${padding + frente},${padding} ${padding + frente},${padding + fondo} ${padding + ochavaSize},${padding + fondo} ${padding},${padding + fondo - ochavaSize}`;
        case "derecha-arriba":
            return `${padding},${padding} ${padding + frente - ochavaSize},${padding} ${padding + frente},${padding + ochavaSize} ${padding + frente},${padding + fondo} ${padding},${padding + fondo}`;
        case "derecha-abajo":
            return `${padding},${padding} ${padding + frente},${padding} ${padding + frente},${padding + fondo - ochavaSize} ${padding + frente - ochavaSize},${padding + fondo} ${padding},${padding + fondo}`;
        default:
            return `${padding},${padding} ${padding + frente},${padding} ${padding + frente},${padding + fondo} ${padding},${padding + fondo}`;
    }
});

const ochavaLabelX = computed(() => {
    const frente = (localForm.value.frente || 0) * scale;
    const ochavaSize = 20; // Size of the ochava in pixels

    switch (localForm.value.ochava) {
        case "izquierda-arriba":
            return padding + ochavaSize / 2;
        case "izquierda-abajo":
            return padding + ochavaSize / 2;
        case "derecha-arriba":
            return padding + frente - ochavaSize / 2;
        case "derecha-abajo":
            return padding + frente - ochavaSize / 2;
        default:
            return padding;
    }
});

const ochavaLabelY = computed(() => {
    const fondo = (localForm.value.fondo || 0) * scale;
    const ochavaSize = 20; // Size of the ochava in pixels

    switch (localForm.value.ochava) {
        case "izquierda-arriba":
            return padding + ochavaSize / 2;
        case "izquierda-abajo":
            return padding + fondo - ochavaSize / 2;
        case "derecha-arriba":
            return padding + ochavaSize / 2;
        case "derecha-abajo":
            return padding + fondo - ochavaSize / 2;
        default:
            return padding;
    }
});

const ochavaCota = computed(() => {
    const ochavaSize = 20; // Size of the ochava in pixels
    return (ochavaSize / scale).toFixed(2);
});

const ochavaCotaX = computed(() => {
    const frente = (localForm.value.frente || 0) * scale;
    const ochavaSize = 20; // Size of the ochava in pixels

    switch (localForm.value.ochava) {
        case "izquierda-arriba":
            return padding + ochavaSize / 2;
        case "izquierda-abajo":
            return padding + ochavaSize / 2;
        case "derecha-arriba":
            return padding + frente - ochavaSize / 2;
        case "derecha-abajo":
            return padding + frente - ochavaSize / 2;
        default:
            return padding;
    }
});

const ochavaCotaY = computed(() => {
    const fondo = (localForm.value.fondo || 0) * scale;
    const ochavaSize = 20; // Size of the ochava in pixels

    switch (localForm.value.ochava) {
        case "izquierda-arriba":
            return padding + ochavaSize / 2 - 10;
        case "izquierda-abajo":
            return padding + fondo - ochavaSize / 2 - 10;
        case "derecha-arriba":
            return padding + ochavaSize / 2 - 10;
        case "derecha-abajo":
            return padding + fondo - ochavaSize / 2 - 10;
        default:
            return padding;
    }
});

watch(
    [
        () => localForm.value.frente,
        () => localForm.value.fondo,
        () => localForm.value.tipoLote,
        () => localForm.value.ochava,
    ],
    () => {
        if (localForm.value.frente && localForm.value.fondo) {
            const frente = parseFloat(localForm.value.frente);
            const fondo = parseFloat(localForm.value.fondo);
            const ochavaSize = 20 / scale; // Size of the ochava in meters

            let superficieTotal = frente * fondo;

            if (localForm.value.tipoLote === "esquina") {
                superficieTotal -= (ochavaSize * ochavaSize) / 2;
            }

            localForm.value.superficieTotal = superficieTotal.toFixed(2);
        }
    },
);
</script>

<style scoped>
/* Add any additional styles here */
</style>
