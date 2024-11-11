<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-sm">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Detalles del Cálculo de Tasación
        </h3>
        <div class="mb-4">
            <h4
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
                Método Comparativo de Mercado
            </h4>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor Promedio por m² en la Zona:</strong>
                {{ currency(valorM2Zona, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Superficie Cubierta:</strong>
                {{ form.superficieCubierta }} m²
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Superficie Semicubierta:</strong>
                {{ form.superficieSemicubierta }} m²
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Coeficiente de Reducción:</strong> 0.5
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Ajuste:</strong> 0.1
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor Comparativo:</strong>
                {{ currency(valorComparativo, form.moneda) }}
            </p>
        </div>
        <div class="mb-4">
            <h4
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
                Método de Costo de Reposición
            </h4>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Costo de Construcción por m²:</strong>
                {{ currency(costoConstruccionM2, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Antigüedad:</strong>
                {{ new Date().getFullYear() - form.anoConstruccion }} años
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Tasa de Depreciación Anual:</strong> 1%
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Factor de Depreciación:</strong>
                {{ factorDepreciacion }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor del Terreno:</strong>
                {{
                    currency(valorTerrenoM2 * form.superficieTotal, form.moneda)
                }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor de Reposición:</strong>
                {{ currency(valorReposicion, form.moneda) }}
            </p>
        </div>
        <div class="mb-4">
            <h4
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
                Método de Capitalización de Rentas
            </h4>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Ingreso Mensual Estimado:</strong>
                {{ currency(1000, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Gastos de Mantenimiento Estimados:</strong>
                {{ currency(200, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Tasa de Capitalización:</strong> 5%
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor de Capitalización:</strong>
                {{ currency(valorCapitalizacion, form.moneda) }}
            </p>
        </div>
        <div class="mb-4">
            <h4
                class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
                Valor Final de Tasación
            </h4>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor Comparativo (40%):</strong>
                {{ currency(valorComparativo * 0.4, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor de Reposición (35%):</strong>
                {{ currency(valorReposicion * 0.35, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor de Capitalización (25%):</strong>
                {{ currency(valorCapitalizacion * 0.25, form.moneda) }}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
                <strong>Valor Final Estimado:</strong>
                {{ currency(valorEstimado, form.moneda) }}
            </p>
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
    valorCapitalizacion: Number,
    valorM2Zona: Number,
    costoConstruccionM2: Number,
    factorDepreciacion: Number,
    valorTerrenoM2: Number,
    tipoCambio: Number,
});

const currency = (value, currency) => {
    const formatter = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: currency === "Pesos Argentinos (ARS)" ? "ARS" : "USD",
    });
    return formatter.format(value);
};
</script>
