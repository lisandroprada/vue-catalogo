<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <!-- Información Bancaria -->
        <div class="md:col-span-1">
            <h3 class="text-base font-semibold text-gray-800">
                Información Bancaria
            </h3>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-4 rounded-lg">
            <div
                v-for="(account, index) in form.bankAccounts"
                :key="index"
                class="mb-4"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-1">
                        <label
                            for="bank"
                            class="block text-sm font-medium text-gray-800 leading-5"
                            >Banco</label
                        >
                        <input
                            v-model="account.bank"
                            :id="'bank-' + index"
                            placeholder="Ingrese el banco"
                            class="input-field text-sm leading-5 w-full"
                        />
                    </div>
                    <div class="space-y-1">
                        <label
                            for="cbu"
                            class="block text-sm font-medium text-gray-800 leading-5"
                            >CBU</label
                        >
                        <input
                            v-model="account.cbu"
                            :id="'cbu-' + index"
                            placeholder="Ingrese el CBU"
                            class="input-field text-sm leading-5 w-full"
                        />
                    </div>
                    <div class="space-y-1 md:col-span-2">
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-800 leading-5"
                            >Descripción</label
                        >
                        <input
                            v-model="account.description"
                            :id="'description-' + index"
                            placeholder="Ingrese la descripción"
                            class="input-field text-sm leading-5 w-full"
                        />
                    </div>
                </div>
                <div class="flex justify-between mt-2">
                    <button
                        @click="removeAccount(index)"
                        class="text-red-500 hover:text-red-700"
                    >
                        Eliminar
                    </button>
                    <div>
                        <button
                            @click="moveAccountUp(index)"
                            :disabled="index === 0"
                            class="text-blue-500 hover:text-blue-700 mr-2"
                        >
                            Subir
                        </button>
                        <button
                            @click="moveAccountDown(index)"
                            :disabled="index === form.bankAccounts.length - 1"
                            class="text-blue-500 hover:text-blue-700"
                        >
                            Bajar
                        </button>
                    </div>
                </div>
            </div>
            <button
                @click="addAccount"
                class="mt-2 text-blue-500 hover:text-blue-700"
            >
                Agregar Cuenta Bancaria
            </button>
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

const addAccount = () => {
    props.form.bankAccounts.push({ bank: "", cbu: "", description: "" });
};

const removeAccount = (index) => {
    props.form.bankAccounts.splice(index, 1);
};

const moveAccountUp = (index) => {
    if (index > 0) {
        const temp = props.form.bankAccounts[index];
        props.form.bankAccounts.splice(index, 1);
        props.form.bankAccounts.splice(index - 1, 0, temp);
    }
};

const moveAccountDown = (index) => {
    if (index < props.form.bankAccounts.length - 1) {
        const temp = props.form.bankAccounts[index];
        props.form.bankAccounts.splice(index, 1);
        props.form.bankAccounts.splice(index + 1, 0, temp);
    }
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
