<template>
    <div class="relative">
        <input
            ref="inputRef"
            type="text"
            class="peer w-full bg-transparent placeholder-transparent text-slate-700 dark:text-slate-300 text-sm border border-gray-400 dark:border-slate-600 rounded-md px-3 py-1 transition duration-300 ease focus:outline-none focus:border-blue-500 dark:focus:border-slate-500 hover:border-gray-500 dark:hover:border-slate-500 shadow-sm focus:shadow focus:bg-white dark:focus:bg-gray-900"
            @focus="handleFocus"
            @blur="handleBlur"
            required
        />
    </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default {
    name: "FormCurrencyInput",
    props: {
        modelValue: Number,
        id: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({
                currency: "ARS",
                locale: "es-AR",
                precision: 2,
                autoDecimalMode: true,
                useGrouping: true,
                hideCurrencySymbol: false,
                hideGroupingSeparator: false,
            }),
        },
    },
    setup(props, { emit }) {
        const isFocused = ref(false);
        const { inputRef, setValue, setOptions } = useCurrencyInput(
            props.options,
        );

        const handleFocus = () => {
            isFocused.value = true;
        };

        const handleBlur = () => {
            isFocused.value = false;
        };

        watch(
            () => props.modelValue,
            (value) => {
                setValue(value);
            },
            { immediate: true },
        );

        watch(
            () => props.options,
            (options) => {
                setOptions(options);
            },
            { immediate: true, deep: true },
        );

        onMounted(() => {
            setValue(props.modelValue);
        });

        return {
            inputRef,
            isFocused,
            handleFocus,
            handleBlur,
        };
    },
};
</script>
