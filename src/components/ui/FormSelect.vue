<template>
    <div class="relative">
        <select
            :value="modelValue"
            @change="updateValue"
            :id="id"
            class="peer w-full bg-transparent text-slate-700 dark:text-slate-300 text-sm border border-gray-400 dark:border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 dark:focus:border-slate-500 hover:border-gray-500 dark:hover:border-slate-500 shadow-sm focus:shadow focus:bg-white dark:focus:bg-gray-900"
            @focus="handleFocus"
            @blur="handleBlur"
            required
        >
            <option value="" disabled selected></option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.text }}
            </option>
        </select>
        <label
            :for="id"
            :class="{
                '-top-2 left-2.5 text-xs text-slate-400 dark:text-slate-300 scale-90':
                    modelValue || isFocused,
                'top-2.5 left-2.5 text-sm text-slate-400 dark:text-slate-300 scale-100':
                    !modelValue && !isFocused,
            }"
            class="absolute cursor-text bg-gray-100 dark:bg-gray-800 px-1 transition-all transform origin-left"
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
    label: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    id: {
        type: String,
        required: true,
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
