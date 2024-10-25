<script setup>
import { ref, watch } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import debounce from "lodash/debounce";

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(["update:modelValue", "select-location"]);

const searchQuery = ref(props.modelValue || "");
const searchResults = ref([]);
const isSearching = ref(false);
const showResults = ref(false);

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== searchQuery.value) {
            searchQuery.value = newValue;
        }
    },
);

const searchAddress = debounce(async (query) => {
    if (!query.trim()) {
        searchResults.value = [];
        return;
    }

    isSearching.value = true;
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();
        searchResults.value = data.map((item) => ({
            display_name: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
        }));
    } catch (error) {
        console.error("Error buscando dirección:", error);
    } finally {
        isSearching.value = false;
    }
}, 500);

const handleInput = (event) => {
    const value = event.target.value;
    searchQuery.value = value;
    emit("update:modelValue", value);
    showResults.value = true;
    searchAddress(value);
};

const handleSelectLocation = (result) => {
    searchQuery.value = result.display_name;
    emit("update:modelValue", result.display_name);
    emit("select-location", {
        address: result.display_name,
        lat: result.lat,
        lng: result.lon,
    });
    showResults.value = false;
    searchResults.value = [];
};
</script>

<template>
    <div class="relative">
        <div class="relative">
            <input
                type="text"
                :value="searchQuery"
                @input="handleInput"
                @focus="showResults = true"
                class="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                placeholder="Buscar dirección..."
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon
                    class="h-5 w-5 text-gray-400"
                    :class="{ 'animate-spin': isSearching }"
                />
            </div>
        </div>

        <!-- Resultados de búsqueda -->
        <div
            v-if="showResults && searchResults.length > 0"
            class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
        >
            <ul class="py-1">
                <li
                    v-for="(result, index) in searchResults"
                    :key="index"
                    class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm"
                    @click="handleSelectLocation(result)"
                >
                    {{ result.display_name }}
                </li>
            </ul>
        </div>
    </div>
</template>
