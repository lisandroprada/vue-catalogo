<template>
    <div class="relative">
        <select
            :value="modelValue"
            @input="updateValue"
            :id="id"
            class="peer w-full bg-transparent text-slate-700 dark:text-slate-300 text-sm border border-gray-400 dark:border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 dark:focus:border-slate-500 hover:border-gray-500 dark:hover:border-slate-600 shadow-sm focus:shadow focus:bg-white dark:focus:bg-gray-900"
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
                {{ option.label }}
            </option>
        </select>
        <label
            :for="id"
            :class="[
                'absolute cursor-text px-1 transition-all transform origin-left',
                {
                    '-top-2 left-2.5 text-xs text-slate-400 dark:text-slate-300 scale-90 bg-gray-100 dark:bg-gray-800':
                        modelValue || isFocused,
                    'top-2.5 left-2.5 text-sm text-slate-400 dark:text-slate-300 scale-100 bg-transparent':
                        !modelValue && !isFocused,
                },
            ]"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null
    },
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const isFocused = ref(false);
const selectedValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    selectedValue.value = newValue;
});

const updateValue = (event) => {
    const target = event.target;
    selectedValue.value = target.value;
    emit('update:modelValue', target.value);
};

const handleFocus = () => {
    isFocused.value = true;
};

const handleBlur = () => {
    isFocused.value = false;
};

defineOptions({
    name: 'FormSelect'
});
</script>
