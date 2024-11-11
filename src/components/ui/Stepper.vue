<template>
    <ol class="overflow-hidden space-y-6">
        <li
            v-for="(step, index) in steps"
            :key="index"
            :class="[
                'relative flex-1',
                index < steps.length - 1
                    ? 'after:content-[\'\'] after:w-0.5 after:h-full after:inline-block after:absolute after:-bottom-10 after:left-1/2'
                    : '',
                index <= currentStep
                    ? 'after:bg-indigo-600'
                    : 'after:bg-gray-200',
            ]"
        >
            <div class="flex items-center justify-center gap-6 w-full max-w-sm">
                <div
                    :class="[
                        'flex items-center gap-2.5 p-2.5 rounded-xl relative z-10 border w-full',
                        currentStep === index
                            ? 'bg-indigo-50 border-indigo-600'
                            : 'bg-gray-50 border-gray-200',
                    ]"
                >
                    <div
                        :class="[
                            'rounded-lg flex items-center justify-center',
                            currentStep === index
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-600',
                        ]"
                    >
                        <span class="p-2">
                            <component :is="icons[index]" class="w-5 h-5" />
                        </span>
                    </div>
                    <div
                        class="flex items-start rounded-md justify-center flex-col"
                    >
                        <h6 class="text-sm font-semibold text-black mb-0.5">
                            {{ step }}
                        </h6>
                        <p class="text-xs font-normal text-gray-500">
                            {{ stepDetails[index] }}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    </ol>
</template>

<script setup>
import {
    HomeIcon,
    ScaleIcon,
    ClockIcon,
    CogIcon,
    UserIcon,
    CheckCircleIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
    steps: {
        type: Array,
        required: true,
    },
    currentStep: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(["update:currentStep"]);

const icons = [
    HomeIcon,
    ScaleIcon,
    ClockIcon,
    CogIcon,
    UserIcon,
    CheckCircleIcon,
];

const stepDetails = [
    "Complete la información básica de la propiedad",
    "Ingrese las dimensiones de la propiedad",
    "Proporcione la antigüedad y estado de la propiedad",
    "Seleccione los servicios y comodidades disponibles",
    "Indique sus preferencias de tasación",
    "Revise el resultado de la tasación",
];
</script>
