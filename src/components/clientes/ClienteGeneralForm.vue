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
                    <FormInput
                        v-model="form.name"
                        id="name"
                        label="Nombre"
                        placeholder="Ingrese el nombre"
                    />
                </div>
                <div class="space-y-1">
                    <FormInput
                        v-model="form.lastName"
                        id="lastName"
                        label="Apellido"
                        placeholder="Ingrese el apellido"
                    />
                </div>
                <div class="space-y-1">
                    <FormSelect
                        v-model="form.gender"
                        id="gender"
                        label="Género"
                        :options="genderOptions"
                    />
                </div>
                <div class="space-y-1">
                    <FormInput
                        v-model="form.identityCard"
                        id="identityCard"
                        label="DNI"
                        placeholder="Ingrese el DNI"
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
                    <FormInput
                        v-model="form.taxId"
                        id="taxId"
                        label="CUIT/CUIL"
                        placeholder="Ingrese el CUIT/CUIL"
                    />
                </div>
                <div class="space-y-1">
                    <FormSelect
                        v-model="form.taxType"
                        id="taxType"
                        label="Tipo de Contribuyente"
                        :options="taxTypeOptions"
                    />
                </div>
                <div class="space-y-1">
                    <FormInput
                        v-model="form.taxAddress"
                        id="taxAddress"
                        label="Domicilio Fiscal"
                        placeholder="Ingrese el domicilio fiscal"
                    />
                </div>
                <div class="space-y-1">
                    <FormCheckbox
                        v-model="form.billing"
                        id="billing"
                        label="Habilitar facturación"
                        helperText="Seleccione esta opción si desea habilitar la facturación para este cliente."
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
import FormInput from "@/components/ui/FormInput.vue";
import FormSelect from "@/components/ui/FormSelect.vue";
import FormCheckbox from "@/components/ui/FormCheckbox.vue";

const props = defineProps({
    form: Object,
});

const genderOptions = [
    { value: "", text: "Seleccione el género", disabled: true },
    { value: "Male", text: "Masculino" },
    { value: "Female", text: "Femenino" },
    { value: "Other", text: "Otro" },
];

const taxTypeOptions = [
    { value: "", text: "Seleccione el tipo", disabled: true },
    { value: "consumidor_final", text: "Consumidor Final" },
    { value: "responsable_inscripto", text: "Responsable Inscripto" },
    { value: "monotributista", text: "Monotributista" },
];
</script>

<style scoped></style>
