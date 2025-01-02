<template>
    <div
        class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 max-w-4xl mx-auto transition-colors duration-300"
    >
        <h2
            class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Z"
                />
            </svg>
            Simulación de Créditos Hipotecarios
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Información del Crédito -->
            <div
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm space-y-4"
            >
                <h3
                    class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                    Datos del Crédito
                </h3>

                <FormInput
                    v-model="montoSinFormato"
                    id="montoOtorgar"
                    type="number"
                    label="Monto a otorgar"
                    @input="formatearMonto"
                />

                <div class="relative">
                    <FormInput
                        v-model="valorUVA"
                        id="valorUVA"
                        type="number"
                        label="Valor de la UVA"
                        readonly
                    />
                    <div
                        v-if="fechaActualizacion"
                        class="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 mr-1"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                            />
                        </svg>
                        Actualizado: {{ formatFecha(fechaActualizacion) }}
                    </div>
                </div>

                <FormSelect
                    v-model="plazo"
                    id="plazo"
                    label="Plazo del crédito"
                    :options="[
                        { value: '240', label: '240 meses' },
                        { value: '120', label: '120 meses' },
                    ]"
                />

                <FormSelect
                    v-model="esClienteBanco"
                    id="clienteBanco"
                    label="¿Es cliente del banco?"
                    :options="[
                        { value: 'true', label: 'Sí' },
                        { value: 'false', label: 'No' },
                    ]"
                    @change="actualizarTasaInteres"
                />

                <FormInput
                    v-model="tasaInteres"
                    id="tasaInteres"
                    type="number"
                    label="Tasa de interés anual (%)"
                    readonly
                />
            </div>

            <!-- Resultados -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                <h3
                    class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                        />
                    </svg>
                    Resultados de la Simulación
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                        <div
                            class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
                        >
                            Monto en UVA
                        </div>
                        <div
                            class="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            {{ montoUVA || "-" }}
                        </div>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                        <div
                            class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
                        >
                            Valor Cuota $ (Variable)
                        </div>
                        <div
                            class="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            {{ cuotaVariable || "-" }}
                        </div>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                        <div
                            class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
                        >
                            Valor Cuota UVA (Fija)
                        </div>
                        <div
                            class="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            {{ cuotaUVAFija || "-" }}
                        </div>
                    </div>

                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-2 border-blue-500 dark:border-blue-400"
                    >
                        <div
                            class="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1"
                        >
                            Ingreso Mensual Requerido
                        </div>
                        <div
                            class="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            {{ ingresoMensual || "-" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 flex justify-end space-x-4">
            <button
                @click="limpiarCalculadora"
                class="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 mr-2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </svg>
                Limpiar
            </button>
            <button
                @click="generarPDF"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 mr-2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                </svg>
                Generar PDF
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, defineComponent } from "vue";
import FormInput from "@/components/ui/FormInput.vue";
import FormSelect from "@/components/ui/FormSelect.vue";
import Cleave from "cleave.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
    valorUVAProp: {
        type: String,
        default: "",
    },
    fechaActualizacionProp: {
        type: String,
        default: "",
    },
});

const montoInput = ref(null);
// const montoOtorgar = ref("ARS 50.000.000,00");
const montoSinFormato = ref("");
const montoOtorgar = ref("ARS 0,00");
const valorUVA = ref(props.valorUVAProp);
const fechaActualizacion = ref(props.fechaActualizacionProp);
const plazo = ref("240");
const tasaInteres = ref(3.5);
const esClienteBanco = ref("true");
const montoUVA = ref("");
const cuotaVariable = ref("");
const cuotaUVAFija = ref("");
const ingresoMensual = ref("");

function calcularMontoUVA(monto, valorUVA) {
    return monto / valorUVA;
}

function calcularCuotaVariable(monto, plazo, tasa) {
    const tasaMensual = tasa / 12 / 100;
    return (
        (monto * tasaMensual * Math.pow(1 + tasaMensual, plazo)) /
        (Math.pow(1 + tasaMensual, plazo) - 1)
    );
}

function calcularCuotaUVAFija(montoUVA, plazo, tasa) {
    const tasaMensual = tasa / 12 / 100;
    return (
        (montoUVA * tasaMensual * Math.pow(1 + tasaMensual, plazo)) /
        (Math.pow(1 + tasaMensual, plazo) - 1)
    );
}

function calcularIngresoMensual(cuotaVariable) {
    return cuotaVariable * 3.5;
}

function formatNumber(num) {
    return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
}

function formatearMonto(event) {
    const valor = event.target.value;
    const numero = parseFloat(valor) || 0;
    montoOtorgar.value = `ARS ${new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numero)}`;
    actualizarCalculos();
}

function obtenerMontoNumerico(montoStr) {
    if (!montoStr) return 0;
    // Eliminar el prefijo 'ARS ' y convertir a número
    return (
        parseFloat(
            montoStr
                .replace("ARS ", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim(),
        ) || 0
    );
}

function actualizarCalculos() {
    const monto = obtenerMontoNumerico(montoOtorgar.value);
    const uva = parseFloat(valorUVA.value.replace(",", "."));
    const plazoMeses = parseInt(plazo.value);
    const tasa = tasaInteres.value;

    if (monto && uva && plazoMeses && tasa) {
        const montoUVACalculado = calcularMontoUVA(monto, uva);
        const cuotaVariableCalculada = calcularCuotaVariable(
            monto,
            plazoMeses,
            tasa,
        );
        const cuotaUVAFijaCalculada = calcularCuotaUVAFija(
            montoUVACalculado,
            plazoMeses,
            tasa,
        );
        const ingresoMensualCalculado = calcularIngresoMensual(
            cuotaVariableCalculada,
        );

        montoUVA.value = formatNumber(montoUVACalculado);
        cuotaVariable.value = "$ " + formatNumber(cuotaVariableCalculada);
        cuotaUVAFija.value = formatNumber(cuotaUVAFijaCalculada);
        ingresoMensual.value = "$ " + formatNumber(ingresoMensualCalculado);
    }
}

function actualizarTasaInteres() {
    tasaInteres.value = esClienteBanco.value === "true" ? 3.5 : 8;
    actualizarCalculos();
}

function limpiarCalculadora() {
    montoOtorgar.value = "ARS 0,00";
    plazo.value = "240";
    tasaInteres.value = 3.5;
    esClienteBanco.value = "true";
    montoUVA.value = "";
    cuotaVariable.value = "";
    cuotaUVAFija.value = "";
    ingresoMensual.value = "";
    // No limpiamos valorUVA ya que viene de la API
}

async function generarPDF() {
    try {
        // Verificar que haya datos para generar el PDF
        if (!montoOtorgar.value || !valorUVA.value || !montoUVA.value) {
            toast.warning(
                "Por favor, complete los datos del crédito antes de generar el PDF",
            );
            return;
        }

        // Crear contenido HTML para imprimir
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <title>Simulación de Crédito Hipotecario</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #2563eb;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    h2 {
                        color: #1e40af;
                        margin-top: 30px;
                    }
                    .date {
                        text-align: right;
                        color: #666;
                        margin-bottom: 30px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f8fafc;
                        color: #1e40af;
                        font-weight: bold;
                    }
                    .highlight {
                        background-color: #f0f9ff;
                    }
                    @media print {
                        body {
                            padding: 0;
                        }
                        button {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>Simulación de Crédito Hipotecario</h1>
                <div class="date">Fecha: ${new Date().toLocaleDateString("es-AR")}</div>

                <h2>Datos del Crédito</h2>
                <table>
                    <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                    </tr>
                    <tr>
                        <td>Monto a otorgar</td>
                        <td>${montoOtorgar.value}</td>
                    </tr>
                    <tr>
                        <td>Valor UVA</td>
                        <td>${valorUVA.value}</td>
                    </tr>
                    <tr>
                        <td>Plazo</td>
                        <td>${plazo.value} meses</td>
                    </tr>
                    <tr>
                        <td>Cliente del banco</td>
                        <td>${esClienteBanco.value === "true" ? "Sí" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Tasa de interés</td>
                        <td>${tasaInteres.value}%</td>
                    </tr>
                </table>

                <h2>Resultados</h2>
                <table>
                    <tr>
                        <th>Concepto</th>
                        <th>Valor</th>
                    </tr>
                    <tr>
                        <td>Monto en UVA</td>
                        <td>${montoUVA.value}</td>
                    </tr>
                    <tr>
                        <td>Cuota Variable</td>
                        <td>${cuotaVariable.value}</td>
                    </tr>
                    <tr>
                        <td>Cuota UVA Fija</td>
                        <td>${cuotaUVAFija.value}</td>
                    </tr>
                    <tr class="highlight">
                        <td>Ingreso Mensual Requerido</td>
                        <td>${ingresoMensual.value}</td>
                    </tr>
                </table>

                <button onclick="window.print()" style="
                    background-color: #2563eb;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 20px;
                ">
                    Imprimir PDF
                </button>
            </body>
            </html>
        `);
        printWindow.document.close();

        toast.success("Documento generado exitosamente");
    } catch (error) {
        console.error("Error al generar el documento:", error);
        toast.error(
            "Error al generar el documento. Por favor, intente nuevamente.",
        );
    }
}

onMounted(async () => {
    await nextTick();

    // Initialize Cleave.js for currency formatting
    const cleaveInstance = new Cleave(
        montoInput.value.$el.querySelector("input"),
        {
            numeral: true,
            numeralDecimalMark: ",",
            delimiter: ".",
            prefix: "ARS ",
            numeralDecimalScale: 2,
            rawValueTrimPrefix: true,
            onValueChanged: function (e) {
                // Actualizar el valor del v-model
                montoOtorgar.value = e.target.value;

                // Si el valor está vacío después de borrar, establecer un valor predeterminado
                if (!e.target.rawValue) {
                    montoOtorgar.value = "ARS 0,00";
                }
            },
        },
    );

    // Agregar event listener para el backspace
    montoInput.value.$el
        .querySelector("input")
        .addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && this.value === "ARS 0,00") {
                e.preventDefault();
                this.value = "ARS 0,00";
            }
        });

    // Set initial values
    if (montoOtorgar.value) {
        cleaveInstance.setRawValue(obtenerMontoNumerico(montoOtorgar.value));
    }
    actualizarCalculos();
});

// Watch for changes in form values
watch([montoOtorgar, valorUVA, plazo, tasaInteres], actualizarCalculos);

// Watch for prop changes
watch(
    () => props.valorUVAProp,
    (newVal) => {
        valorUVA.value = newVal;
        actualizarCalculos();
    },
);

watch(
    () => props.fechaActualizacionProp,
    (newVal) => {
        fechaActualizacion.value = newVal;
    },
);

function formatFecha(fecha) {
    if (!fecha) return "";
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(fecha).toLocaleString("es-AR", options);
}

defineComponent({
    name: "CreditSimulator",
});
</script>
