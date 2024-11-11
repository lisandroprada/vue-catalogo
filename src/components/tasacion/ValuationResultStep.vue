<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-sm">
        <div v-if="loading" class="flex justify-center items-center h-full">
            <div
                class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-white"
            ></div>
        </div>
        <div v-else>
            <div class="mb-4">
                <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                    Valor Estimado de Tasación
                </h3>
                <p
                    class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4"
                >
                    {{ currency(valorEstimado, form.moneda) }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow">
                    <h4
                        class="text-md font-semibold text-gray-900 dark:text-white mb-1"
                    >
                        Método Comparativo
                    </h4>
                    <p
                        class="text-xl font-bold text-green-600 dark:text-green-400"
                    >
                        {{ currency(valorComparativo, form.moneda) }}
                    </p>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow">
                    <h4
                        class="text-md font-semibold text-gray-900 dark:text-white mb-1"
                    >
                        Método de Costo
                    </h4>
                    <p
                        class="text-xl font-bold text-green-600 dark:text-green-400"
                    >
                        {{ currency(valorReposicion, form.moneda) }}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <h4
                        class="text-md font-semibold text-gray-900 dark:text-white mb-2"
                    >
                        Información de la Propiedad
                    </h4>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Tipo de Propiedad:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.tipoPropiedad }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Dirección:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.direccion }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Ciudad:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.ciudad }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Barrio/Zona:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.barrio }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Superficie Cubierta:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.superficieCubierta }} m²
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Superficie Semicubierta:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.superficieSemicubierta }} m²
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Superficie Total del Terreno:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.superficieTotal }} m²
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Número de Dormitorios:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.dormitorios }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Número de Baños:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.banos }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Año de Construcción:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.anoConstruccion }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Año de Última Remodelación:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.anoRemodelacion }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Estado de Conservación:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.estadoConservacion }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Servicios Básicos:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.serviciosBasicos.join(", ") }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Amenities:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ form.amenities.join(", ") }}
                        </p>
                    </div>
                </div>
                <div>
                    <h4
                        class="text-md font-semibold text-gray-900 dark:text-white mb-2"
                    >
                        Datos Utilizados en el Cálculo
                    </h4>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Valor promedio del m² en la zona:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ currency(valorM2Zona, form.moneda) }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Costo de construcción por m²:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ currency(costoConstruccionM2, form.moneda) }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Factor de depreciación aplicado:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ factorDepreciacion }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Valor del terreno por m²:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ currency(valorTerrenoM2, form.moneda) }}
                        </p>
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow mb-2"
                    >
                        <p class="text-xs text-gray-700 dark:text-gray-300">
                            Tipo de cambio utilizado:
                        </p>
                        <p
                            class="text-md font-bold text-blue-600 dark:text-blue-400"
                        >
                            {{ tipoCambio }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
    valorEstimado: Number,
    valorComparativo: Number,
    valorReposicion: Number,
    valorM2Zona: Number,
    costoConstruccionM2: Number,
    factorDepreciacion: Number,
    valorTerrenoM2: Number,
    tipoCambio: Number,
    loading: Boolean,
});

const currency = (value, currency) => {
    const formatter = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: currency === "Pesos Argentinos (ARS)" ? "ARS" : "USD",
    });
    return formatter.format(value);
};
</script>
