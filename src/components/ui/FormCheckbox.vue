<template>
    <div class="flex">
        <div class="flex items-center h-5">
            <input
                :id="id"
                :aria-describedby="helperText ? `${id}-helper-text` : null"
                type="checkbox"
                :value="value"
                :checked="modelValue"
                @change="updateValue"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
        </div>
        <div class="ms-2 text-sm">
            <label
                :for="id"
                class="font-medium text-gray-900 dark:text-gray-300"
                >{{ label }}</label
            >
            <p
                v-if="helperText"
                :id="`${id}-helper-text`"
                class="text-xs font-normal text-gray-500 dark:text-gray-300"
            >
                {{ helperText }}
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    helperText: {
        type: String,
        default: "",
    },
    value: {
        type: [String, Number, Boolean],
        default: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
    emit("update:modelValue", event.target.checked);
};
</script>
