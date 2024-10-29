<script setup>
import { computed } from "vue";
import { useContratosStore } from "@/stores/contratosStore";

const contratosStore = useContratosStore();

const totalContratos = computed(() => contratosStore.contratos.length);
const totalClientes = computed(() => {
    const clientes = contratosStore.contratos.map(
        (contrato) => contrato.cliente,
    );
    return new Set(clientes).size;
});
const totalPropiedades = computed(() => {
    const propiedades = contratosStore.contratos.map(
        (contrato) => contrato.propiedad,
    );
    return new Set(propiedades).size;
});
const totalIncrementos = computed(() => {
    const incrementos = contratosStore.contratos.map(
        (contrato) => contrato.tipoIncremento,
    );
    return new Set(incrementos).size;
});
const contratosPorTipoIncremento = computed(() => {
    return contratosStore.contratos.reduce((acc, contrato) => {
        if (!acc[contrato.tipoIncremento]) {
            acc[contrato.tipoIncremento] = 0;
        }
        acc[contrato.tipoIncremento]++;
        return acc;
    }, {});
});
const promedioAlquilerPorTipoIncremento = computed(() => {
    // Suponiendo que cada contrato tiene un campo "alquiler"
    const sumas = {};
    const cantidades = {};
    contratosStore.contratos.forEach((contrato) => {
        if (!sumas[contrato.tipoIncremento]) {
            sumas[contrato.tipoIncremento] = 0;
            cantidades[contrato.tipoIncremento] = 0;
        }
        sumas[contrato.tipoIncremento] += contrato.alquiler || 0;
        cantidades[contrato.tipoIncremento]++;
    });
    const promedios = {};
    for (const tipo in sumas) {
        promedios[tipo] = sumas[tipo] / cantidades[tipo];
    }
    return promedios;
});
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-bold text-gray-700">Total Contratos</h3>
            <p class="text-3xl font-semibold text-blue-600">
                {{ totalContratos }}
            </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-bold text-gray-700">Total Clientes</h3>
            <p class="text-3xl font-semibold text-blue-600">
                {{ totalClientes }}
            </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-bold text-gray-700">Total Propiedades</h3>
            <p class="text-3xl font-semibold text-blue-600">
                {{ totalPropiedades }}
            </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-bold text-gray-700">
                Total Tipos de Incremento
            </h3>
            <p class="text-3xl font-semibold text-blue-600">
                {{ totalIncrementos }}
            </p>
        </div>
        <div
            class="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3"
        >
            <h3 class="text-lg font-bold text-gray-700">
                Contratos por Tipo de Incremento
            </h3>
            <ul class="list-disc list-inside">
                <li
                    v-for="(cantidad, tipo) in contratosPorTipoIncremento"
                    :key="tipo"
                >
                    {{ tipo }}: {{ cantidad }}
                </li>
            </ul>
        </div>
        <div
            class="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3"
        >
            <h3 class="text-lg font-bold text-gray-700">
                Promedio de Alquiler por Tipo de Incremento
            </h3>
            <ul class="list-disc list-inside">
                <li
                    v-for="(
                        promedio, tipo
                    ) in promedioAlquilerPorTipoIncremento"
                    :key="tipo"
                >
                    {{ tipo }}: {{ promedio.toFixed(2) }}
                </li>
            </ul>
        </div>
    </div>
</template>
