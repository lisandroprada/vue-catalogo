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
                    <FormInput
                        v-model="form.email"
                        id="email"
                        type="email"
                        label="Correo Electrónico"
                        placeholder="Ingrese el correo electrónico"
                    />
                </div>
                <div class="space-y-1">
                    <div
                        v-for="(phone, index) in form.phone"
                        :key="index"
                        class="flex space-x-2"
                    >
                        <FormInput
                            v-model="phone.number"
                            :id="'phone-' + index"
                            label="Número de Teléfono"
                            placeholder="Ingrese el número de teléfono"
                        />
                        <FormSelect
                            v-model="phone.type"
                            :id="'phone-type-' + index"
                            label="Tipo"
                            :options="phoneOptions"
                        />
                        <button
                            @click="removePhone(index)"
                            class="text-red-500 hover:text-red-700"
                        >
                            <TrashIcon class="w-5 h-5" />
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
                    <FormInput
                        v-model="form.address"
                        id="address"
                        label="Dirección"
                        placeholder="Ingrese la dirección"
                    />
                </div>
                <div class="space-y-1">
                    <FormSelect
                        v-model="form.province"
                        id="province"
                        label="Provincia"
                        :options="
                            provinces.map((province) => ({
                                value: province._id,
                                text: province.nombre,
                            }))
                        "
                        @change="onProvinceChange"
                    />
                </div>
                <div class="space-y-1">
                    <FormSelect
                        v-model="form.locality"
                        id="locality"
                        label="Localidad"
                        :options="
                            localities.map((locality) => ({
                                value: locality._id,
                                text: locality.nombre,
                            }))
                        "
                    />
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
import { TrashIcon } from "@heroicons/vue/24/outline";
import FormInput from "@/components/ui/FormInput.vue";
import FormSelect from "@/components/ui/FormSelect.vue";

const props = defineProps({
    form: Object,
    provinces: Array,
    localities: Array,
});

const emit = defineEmits(["province-changed"]);

const phoneOptions = [
    { value: "home", text: "Casa" },
    { value: "work", text: "Trabajo" },
    { value: "mobile", text: "Móvil" },
    { value: "other", text: "Otro" },
];

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
