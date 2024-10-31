<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <!-- Información Personal -->
        <div class="md:col-span-1">
            <h3 class="text-base font-semibold text-gray-800">
                Información Personal
            </h3>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Nombre</label
                    >
                    <input
                        v-model="form.name"
                        id="name"
                        placeholder="Ingrese el nombre"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
                <div class="space-y-1">
                    <label
                        for="lastName"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Apellido</label
                    >
                    <input
                        v-model="form.lastName"
                        id="lastName"
                        placeholder="Ingrese el apellido"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
                <div class="space-y-1">
                    <label
                        for="gender"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Género</label
                    >
                    <select
                        v-model="form.gender"
                        id="gender"
                        class="input-field text-sm leading-5 w-full"
                    >
                        <option value="" disabled>Seleccione el género</option>
                        <option value="Male">Masculino</option>
                        <option value="Female">Femenino</option>
                        <option value="Other">Otro</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label
                        for="identityCard"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >DNI</label
                    >
                    <input
                        v-model="form.identityCard"
                        id="identityCard"
                        placeholder="Ingrese el DNI"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
            </div>
        </div>

        <!-- Información Fiscal -->
        <div class="md:col-span-1">
            <h3 class="text-base font-semibold text-gray-800">
                Información Fiscal
            </h3>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1">
                    <label
                        for="taxId"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >CUIT/CUIL</label
                    >
                    <input
                        v-model="form.taxId"
                        id="taxId"
                        placeholder="Ingrese el CUIT/CUIL"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
                <div class="space-y-1">
                    <label
                        for="taxType"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Tipo de Contribuyente</label
                    >
                    <select
                        v-model="form.taxType"
                        id="taxType"
                        class="input-field text-sm leading-5 w-full"
                    >
                        <option value="" disabled>Seleccione el tipo</option>
                        <option value="consumidor_final">
                            Consumidor Final
                        </option>
                        <option value="responsable_inscripto">
                            Responsable Inscripto
                        </option>
                        <option value="monotributista">Monotributista</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label
                        for="taxAddress"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Domicilio Fiscal</label
                    >
                    <input
                        v-model="form.taxAddress"
                        id="taxAddress"
                        placeholder="Ingrese el domicilio fiscal"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
                <div class="space-y-1">
                    <label
                        for="billing"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Facturación</label
                    >
                    <div class="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            v-model="form.billing"
                            id="billing"
                            class="h-4 w-4 text-indigo-600 border-gray-400 rounded focus:ring-indigo-500"
                        />
                        <label
                            for="billing"
                            class="text-sm font-medium text-gray-800 leading-5"
                            >Habilitar facturación</label
                        >
                    </div>
                </div>
            </div>
        </div>

        <button
            type="submit"
            class="ml-auto bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
        >
            Guardar Cliente
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    form: Object,
});
</script>

<style scoped>
.input-field {
    padding: 0.5rem;
    border: 1px solid #4b5563; /* Cambiado a un color más oscuro */
    border-radius: 0.375rem;
    background-color: #f9fafb; /* Cambiado a un color más claro */
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}

.input-field:focus {
    border-color: #1d4ed8; /* Cambiado a un color más oscuro */
    box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.3); /* Cambiado a un color más oscuro */
    outline: none;
}
</style>
