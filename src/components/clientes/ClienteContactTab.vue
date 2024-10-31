<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <!-- Información de Contacto -->
        <div class="md:col-span-1">
            <h3 class="text-base font-semibold text-gray-800">
                Información de Contacto
            </h3>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-1 md:col-span-2">
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Correo Electrónico</label
                    >
                    <input
                        v-model="form.email"
                        id="email"
                        type="email"
                        placeholder="Ingrese el correo electrónico"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
                <div class="space-y-1">
                    <label
                        for="phone"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Teléfono</label
                    >
                    <div
                        v-for="(phone, index) in form.phone"
                        :key="index"
                        class="flex space-x-2"
                    >
                        <input
                            v-model="phone.number"
                            :id="'phone-' + index"
                            placeholder="Ingrese el número de teléfono"
                            class="input-field text-sm leading-5 w-full"
                        />
                        <select
                            v-model="phone.type"
                            class="input-field text-sm leading-5 w-1/3"
                        >
                            <option value="home">Casa</option>
                            <option value="work">Trabajo</option>
                            <option value="mobile">Móvil</option>
                            <option value="other">Otro</option>
                        </select>
                        <button
                            @click="removePhone(index)"
                            class="text-red-500 hover:text-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                    <button
                        @click="addPhone"
                        class="mt-2 text-blue-500 hover:text-blue-700"
                    >
                        Agregar Teléfono
                    </button>
                </div>
                <div class="space-y-1">
                    <label
                        for="address"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Dirección</label
                    >
                    <input
                        v-model="form.address"
                        id="address"
                        placeholder="Ingrese la dirección"
                        class="input-field text-sm leading-5 w-full"
                    />
                </div>
                <div class="space-y-1">
                    <label
                        for="province"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Provincia</label
                    >
                    <select
                        v-model="form.province"
                        id="province"
                        class="input-field text-sm leading-5 w-full"
                        @change="onProvinceChange"
                    >
                        <option value="" disabled>
                            Seleccione la provincia
                        </option>
                        <option
                            v-for="province in provinces"
                            :key="province._id"
                            :value="province._id"
                        >
                            {{ province.nombre }}
                        </option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label
                        for="locality"
                        class="block text-sm font-medium text-gray-800 leading-5"
                        >Localidad</label
                    >
                    <select
                        v-model="form.locality"
                        id="locality"
                        class="input-field text-sm leading-5 w-full"
                    >
                        <option value="" disabled>
                            Seleccione la localidad
                        </option>
                        <option
                            v-for="locality in localities"
                            :key="locality._id"
                            :value="locality._id"
                        >
                            {{ locality.nombre }}
                        </option>
                    </select>
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
    provinces: Array,
    localities: Array,
});

const emit = defineEmits(["province-changed"]);

const addPhone = () => {
    props.form.phone.push({ number: "", type: "other" });
};

const removePhone = (index) => {
    props.form.phone.splice(index, 1);
};

const onProvinceChange = (event) => {
    const provinceId = event.target.value;
    emit("province-changed", provinceId);
};
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
