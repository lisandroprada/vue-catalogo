<template>
    <div class="container mx-auto p-4 bg-gray-50">
        <!-- Filtro de fecha y totalizadores -->
        <div
            class="mb-6 bg-white shadow-sm rounded-lg p-4"
            :class="{ 'mr-96': drawerAbierto }"
        >
            <div class="flex flex-wrap items-center justify-between">
                <div class="flex items-center space-x-4 mb-2 sm:mb-0">
                    <label
                        for="fechaFiltro"
                        class="text-sm font-medium text-gray-700 flex items-center"
                    >
                        <CalendarIcon class="h-5 w-5 mr-1 text-gray-500" />
                        Filtrar hasta:
                    </label>
                    <div class="relative">
                        <input
                            type="date"
                            id="fechaFiltro"
                            v-model="fechaFiltro"
                            class="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-8"
                        />
                        <CalendarIcon
                            class="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                    </div>
                </div>
                <div class="flex space-x-4 text-sm">
                    <div class="flex items-center">
                        <CreditCardIcon class="h-5 w-5 mr-1 text-green-500" />
                        <span class="font-medium text-gray-700">Crédito:</span>
                        <span class="ml-1 text-green-600">{{
                            formatCurrency(totalCredito)
                        }}</span>
                    </div>
                    <div class="flex items-center">
                        <BanknotesIcon class="h-5 w-5 mr-1 text-red-500" />
                        <span class="font-medium text-gray-700">Débito:</span>
                        <span class="ml-1 text-red-600">{{
                            formatCurrency(Math.abs(totalDebito))
                        }}</span>
                    </div>
                    <div class="flex items-center">
                        <ScaleIcon class="h-5 w-5 mr-1 text-blue-500" />
                        <span class="font-medium text-gray-700">Neto:</span>
                        <span
                            class="ml-1"
                            :class="{
                                'text-green-600': neto >= 0,
                                'text-red-600': neto < 0,
                            }"
                        >
                            {{ formatCurrency(neto) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabla de asientos -->
        <div
            class="bg-white shadow-sm rounded-lg overflow-hidden"
            :class="{ 'mr-96': drawerAbierto }"
        >
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
                        >
                            <input
                                type="checkbox"
                                :checked="todosSeleccionados"
                                @change="seleccionarTodo"
                                class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-200"
                            />
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Descripción
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            :class="{ 'hidden md:table-cell': drawerAbierto }"
                        >
                            Tipo
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Monto
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            :class="{ 'hidden lg:table-cell': drawerAbierto }"
                        >
                            Vencimiento
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                        v-for="asiento in asientosPaginados"
                        :key="asiento.id"
                        class="hover:bg-gray-50"
                    >
                        <td class="px-6 py-4 whitespace-nowrap">
                            <input
                                type="checkbox"
                                :checked="estaEnCarrito(asiento)"
                                @change="toggleAsientoEnCarrito(asiento)"
                                class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-200"
                            />
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">
                                {{ asiento.descripcion }}
                            </div>
                            <div
                                v-if="drawerAbierto"
                                class="text-xs text-gray-500 md:hidden"
                            >
                                {{ asiento.tipo }}
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap"
                            :class="{ 'hidden md:table-cell': drawerAbierto }"
                        >
                            <span
                                :class="[
                                    'px-2 inline-flex text-xs leading-5 font-medium rounded-full',
                                    asiento.tipo === 'Crédito'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800',
                                ]"
                            >
                                {{ asiento.tipo }}
                            </span>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ formatCurrency(asiento.monto) }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            :class="{ 'hidden lg:table-cell': drawerAbierto }"
                        >
                            {{ formatDate(asiento.vencimiento) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Paginación -->
        <div
            class="mt-4 flex flex-wrap justify-between items-center"
            :class="{ 'mr-96': drawerAbierto }"
        >
            <div class="flex items-center space-x-2 mb-2 sm:mb-0">
                <button
                    @click="cambiarPagina(-1)"
                    :disabled="paginaActual === 1"
                    class="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center"
                >
                    <ChevronLeftIcon class="h-4 w-4 mr-1" />
                    Anterior
                </button>
                <button
                    @click="cambiarPagina(1)"
                    :disabled="paginaActual === totalPaginas"
                    class="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center"
                >
                    Siguiente
                    <ChevronRightIcon class="h-4 w-4 ml-1" />
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-600">
                    Página {{ paginaActual }} de {{ totalPaginas }}
                </span>
                <select
                    v-model="asientosPorPagina"
                    class="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                    <option :value="5">5 por página</option>
                    <option :value="10">10 por página</option>
                    <option :value="20">20 por página</option>
                </select>
            </div>
        </div>

        <!-- Botón para abrir el drawer -->
        <button
            @click="abrirDrawer"
            class="mt-6 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm flex items-center"
        >
            <ShoppingCartIcon class="h-5 w-5 mr-2" />
            Ver Carrito ({{ carrito.length }})
        </button>

        <!-- Drawer (carrito de compras) -->
        <div
            v-if="drawerAbierto"
            class="fixed inset-y-0 right-[63px] w-96 bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto mt-[105px]"
        >
            <div class="flex justify-between items-center mb-4">
                <button
                    @click="agregarTodo"
                    class="text-sm text-blue-600 hover:text-blue-800"
                >
                    <PlusCircleIcon class="h-5 w-5 inline-block mr-1" />
                    Agregar todo
                </button>
                <button
                    @click="limpiarCarrito"
                    class="text-sm text-red-600 hover:text-red-800"
                >
                    <TrashIcon class="h-5 w-5 inline-block mr-1" />
                    Limpiar carrito
                </button>
            </div>
            <ul class="space-y-4">
                <li
                    v-for="item in carrito"
                    :key="item.id"
                    class="border-b pb-4"
                >
                    <div class="flex justify-between items-start">
                        <div class="text-sm text-gray-800">
                            {{ item.descripcion }}
                            <CreditCardIcon
                                v-if="item.tipo === 'Crédito'"
                                class="h-4 w-4 inline-block ml-1 text-green-500"
                            />
                            <BanknotesIcon
                                v-else
                                class="h-4 w-4 inline-block ml-1 text-red-500"
                            />
                        </div>
                        <div class="text-xs text-gray-600">
                            {{ item.disponible }}
                        </div>
                    </div>
                    <div class="mt-2 flex items-center">
                        <label
                            class="block text-xs font-medium text-gray-700 mr-2"
                        >
                            {{
                                item.tipo === "Crédito"
                                    ? "Monto a liquidar:"
                                    : "Monto a cobrar:"
                            }}
                        </label>
                        <div class="relative rounded-md shadow-sm flex-grow">
                            <div
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                            >
                                <span class="text-gray-500 sm:text-xs">$</span>
                            </div>
                            <input
                                type="number"
                                v-model.number="item.montoALiquidar"
                                :max="Math.abs(item.monto)"
                                :min="0"
                                @input="validarMonto(item)"
                                class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-xs border-gray-300 rounded-md"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </li>
            </ul>
            <div
                class="mt-6 font-medium text-sm text-gray-800 flex items-center"
            >
                <CurrencyDollarIcon class="h-5 w-5 mr-2 text-green-500" />
                Total a liquidar: {{ formatCurrency(totalALiquidar) }}
            </div>
            <div class="mt-6 flex justify-between">
                <button
                    @click="cerrarDrawer"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 px-4 rounded-md shadow-sm flex items-center"
                >
                    <XMarkIcon class="h-5 w-5 mr-2" />
                    Cerrar
                </button>
                <button
                    class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm flex items-center"
                >
                    <CheckIcon class="h-5 w-5 mr-2" />
                    Checkout
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
    ClipboardDocumentListIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CalculatorIcon,
    ShoppingCartIcon,
    ShoppingBagIcon,
    CurrencyDollarIcon,
    XMarkIcon,
    PlusCircleIcon,
    TrashIcon,
    CalendarIcon,
    CreditCardIcon,
    BanknotesIcon,
    ScaleIcon,
    CheckIcon,
} from "@heroicons/vue/24/outline";

// Función para generar fechas aleatorias
function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
}

// Datos de ejemplo con más asientos y fechas de vencimiento
const asientos = ref([
    {
        id: 1,
        descripcion: "Alquiler Apto 101",
        tipo: "Crédito",
        monto: 1000,
        disponible: "Saldo a liquidar: $1000",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 2,
        descripcion: "Honorarios inmobiliarios",
        tipo: "Débito",
        monto: -100,
        disponible: "Recaudado: $100",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 3,
        descripcion: "Reparación plomería",
        tipo: "Débito",
        monto: -200,
        disponible: "Recaudado: $200",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 4,
        descripcion: "Alquiler Local 3",
        tipo: "Crédito",
        monto: 1500,
        disponible: "Saldo a liquidar: $1500",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 5,
        descripcion: "Impuesto municipal",
        tipo: "Débito",
        monto: -300,
        disponible: "Recaudado: $300",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 6,
        descripcion: "Alquiler Apto 202",
        tipo: "Crédito",
        monto: 1200,
        disponible: "Saldo a liquidar: $1200",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 7,
        descripcion: "Mantenimiento ascensor",
        tipo: "Débito",
        monto: -150,
        disponible: "Recaudado: $150",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 8,
        descripcion: "Alquiler Cochera 5",
        tipo: "Crédito",
        monto: 200,
        disponible: "Saldo a liquidar: $200",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 9,
        descripcion: "Seguro edificio",
        tipo: "Débito",
        monto: -500,
        disponible: "Recaudado: $500",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 10,
        descripcion: "Alquiler Local 7",
        tipo: "Crédito",
        monto: 2000,
        disponible: "Saldo a liquidar: $2000",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 11,
        descripcion: "Gastos administrativos",
        tipo: "Débito",
        monto: -80,
        disponible: "Recaudado: $80",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
    {
        id: 12,
        descripcion: "Alquiler Apto 303",
        tipo: "Crédito",
        monto: 1300,
        disponible: "Saldo a liquidar: $1300",
        vencimiento: randomDate(new Date(2024, 10, 1), new Date(2024, 11, 31)),
    },
]);

const carrito = ref([]);
const drawerAbierto = ref(false);
const fechaFiltro = ref(new Date().toISOString().split("T")[0]); // Fecha actual por defecto

// Paginación
const asientosPorPagina = ref(5);
const paginaActual = ref(1);

const asientosFiltrados = computed(() => {
    return asientos.value
        .filter(
            (asiento) =>
                new Date(asiento.vencimiento) <= new Date(fechaFiltro.value),
        )
        .sort((a, b) => new Date(a.vencimiento) - new Date(b.vencimiento));
});

const asientosPaginados = computed(() => {
    const inicio = (paginaActual.value - 1) * asientosPorPagina.value;
    const fin = inicio + asientosPorPagina.value;
    return asientosFiltrados.value.slice(inicio, fin);
});

const totalPaginas = computed(() =>
    Math.ceil(asientosFiltrados.value.length / asientosPorPagina.value),
);

const totalCredito = computed(() => {
    return asientosFiltrados.value
        .filter((asiento) => asiento.tipo === "Crédito")
        .reduce((total, asiento) => total + asiento.monto, 0);
});

const totalDebito = computed(() => {
    return asientosFiltrados.value
        .filter((asiento) => asiento.tipo === "Débito")
        .reduce((total, asiento) => total + asiento.monto, 0);
});

const neto = computed(() => totalCredito.value + totalDebito.value);

const todosSeleccionados = computed(() => {
    return asientosPaginados.value.every((asiento) => estaEnCarrito(asiento));
});

function cambiarPagina(delta) {
    paginaActual.value = Math.max(
        1,
        Math.min(totalPaginas.value, paginaActual.value + delta),
    );
}

const totalSeleccionado = computed(() => {
    return carrito.value.reduce((total, item) => total + item.monto, 0);
});

const totalALiquidar = computed(() => {
    return carrito.value.reduce((total, item) => {
        const montoAjustado =
            item.tipo === "Débito" ? -item.montoALiquidar : item.montoALiquidar;
        return total + montoAjustado;
    }, 0);
});

function estaEnCarrito(asiento) {
    return carrito.value.some((item) => item.id === asiento.id);
}

function toggleAsientoEnCarrito(asiento) {
    const index = carrito.value.findIndex((item) => item.id === asiento.id);
    if (index === -1) {
        carrito.value.push({
            ...asiento,
            montoALiquidar: Math.abs(asiento.monto),
        });
    } else {
        carrito.value.splice(index, 1);
    }
}

function seleccionarTodo() {
    if (todosSeleccionados.value) {
        carrito.value = carrito.value.filter(
            (item) =>
                !asientosPaginados.value.some(
                    (asiento) => asiento.id === item.id,
                ),
        );
    } else {
        asientosPaginados.value.forEach((asiento) => {
            if (!estaEnCarrito(asiento)) {
                carrito.value.push({
                    ...asiento,
                    montoALiquidar: Math.abs(asiento.monto),
                });
            }
        });
    }
}

function agregarTodo() {
    asientosFiltrados.value.forEach((asiento) => {
        if (!estaEnCarrito(asiento)) {
            toggleAsientoEnCarrito(asiento);
        }
    });
}

function limpiarCarrito() {
    carrito.value = [];
}

function abrirDrawer() {
    drawerAbierto.value = true;
}

function cerrarDrawer() {
    drawerAbierto.value = false;
}

function validarMonto(item) {
    const maxMonto = Math.abs(item.monto);
    if (item.montoALiquidar > maxMonto) {
        item.montoALiquidar = maxMonto;
    }
    if (item.montoALiquidar < 0) {
        item.montoALiquidar = 0;
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
    }).format(value);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("es-AR");
}

// Observar cambios en asientosPorPagina para resetear la página actual
watch(asientosPorPagina, () => {
    paginaActual.value = 1;
});
</script>
