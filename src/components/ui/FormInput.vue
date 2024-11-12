<template>
    <div class="relative">
        <input
            :value="modelValue"
            @input="updateValue"
            :type="type"
            :id="id"
            :readonly="readonly"
            autocomplete="off"
            class="peer w-full bg-transparent placeholder-transparent text-slate-700 dark:text-slate-300 text-sm border border-gray-400 dark:border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 dark:focus:border-slate-500 hover:border-gray-500 dark:hover:border-slate-500 shadow-sm focus:shadow focus:bg-white dark:focus:bg-gray-900"
            @focus="handleFocus"
            @blur="handleBlur"
            required
        />
        <label
            :for="id"
            :class="[
                'absolute cursor-text px-1 transition-all transform origin-left',
                {
                    '-top-2 left-2.5 text-xs text-slate-400 dark:text-slate-300 scale-90 bg-gray-100 dark:bg-gray-800':
                        (modelValue !== null && modelValue !== '') || isFocused,
                    'top-2.5 left-2.5 text-sm text-slate-400 dark:text-slate-300 scale-100 bg-transparent':
                        modelValue === null ||
                        (modelValue === '' && !isFocused),
                },
            ]"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Number, null],
        required: true,
    },
    type: {
        type: String,
        default: "text",
    },
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);

const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
};

const handleFocus = () => {
    isFocused.value = true;
};

const handleBlur = () => {
    isFocused.value = false;
};
</script>
