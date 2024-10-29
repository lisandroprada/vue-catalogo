<template>
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
            <div class="fixed inset-0 transition-opacity" @click="close">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
                class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full"
            >
                <div
                    class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                >
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"
                        >
                            <h3
                                class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200"
                                id="modal-title"
                            >
                                Detalles de la Factura
                            </h3>
                            <div class="mt-2">
                                <div
                                    class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                >
                                    <div>
                                        <label
                                            for="cuit"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >CUIT</label
                                        >
                                        <input
                                            type="text"
                                            id="cuit"
                                            v-model="factura.cuit"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="nombre"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Nombre del Cliente</label
                                        >
                                        <input
                                            type="text"
                                            id="nombre"
                                            v-model="factura.nombre"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="domicilio"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Domicilio</label
                                        >
                                        <input
                                            type="text"
                                            id="domicilio"
                                            v-model="factura.domicilio"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="localidad"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Localidad</label
                                        >
                                        <input
                                            type="text"
                                            id="localidad"
                                            v-model="factura.localidad"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="provincia"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Provincia</label
                                        >
                                        <input
                                            type="text"
                                            id="provincia"
                                            v-model="factura.provincia"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="codigoPostal"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Código Postal</label
                                        >
                                        <input
                                            type="text"
                                            id="codigoPostal"
                                            v-model="factura.codigoPostal"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="telefono"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Teléfono</label
                                        >
                                        <input
                                            type="text"
                                            id="telefono"
                                            v-model="factura.telefono"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="email"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Email</label
                                        >
                                        <input
                                            type="email"
                                            id="email"
                                            v-model="factura.email"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="fechaEmision"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Fecha de Emisión</label
                                        >
                                        <input
                                            type="date"
                                            id="fechaEmision"
                                            v-model="factura.fechaEmision"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="fechaVencimiento"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Fecha de Vencimiento</label
                                        >
                                        <input
                                            type="date"
                                            id="fechaVencimiento"
                                            v-model="factura.fechaVencimiento"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="fechaPago"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Fecha de Pago</label
                                        >
                                        <input
                                            type="date"
                                            id="fechaPago"
                                            v-model="factura.fechaPago"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="montoTotal"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Monto Total</label
                                        >
                                        <input
                                            type="number"
                                            id="montoTotal"
                                            v-model="factura.montoTotal"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="montoPagado"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Monto Pagado</label
                                        >
                                        <input
                                            type="number"
                                            id="montoPagado"
                                            v-model="factura.montoPagado"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="montoPendiente"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Monto Pendiente</label
                                        >
                                        <input
                                            type="number"
                                            id="montoPendiente"
                                            v-model="factura.montoPendiente"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="estado"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >Estado de la Factura</label
                                        >
                                        <select
                                            id="estado"
                                            v-model="factura.estado"
                                            class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                        >
                                            <option value="Pagada">
                                                Pagada
                                            </option>
                                            <option value="Pendiente">
                                                Pendiente
                                            </option>
                                            <option value="Anulada">
                                                Anulada
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                    <button
                        @click="saveChanges"
                        class="btn-primary w-full sm:ml-3 sm:w-auto"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        @click="close"
                        class="btn-secondary w-full mt-3 sm:mt-0 sm:w-auto"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    show: Boolean,
    factura: Object,
});

const emit = defineEmits(["update:show", "save"]);

const localFactura = ref({ ...props.factura });

const close = () => {
    emit("update:show", false);
};

const saveChanges = () => {
    emit("save", localFactura.value);
    close();
};

watch(
    () => props.factura,
    (newVal) => {
        localFactura.value = { ...newVal };
    },
);
</script>

<style scoped>
.btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #2563eb;
}

.btn-secondary {
    background-color: #e5e7eb;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-secondary:hover {
    background-color: #d1d5db;
}
</style>
