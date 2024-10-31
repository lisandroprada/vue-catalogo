<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <!-- Propiedades del Cliente -->
        <div class="md:col-span-1">
            <h3 class="text-base font-semibold text-gray-800">
                Propiedades del Cliente
            </h3>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-4 rounded-lg">
            <!-- Aquí puedes agregar los campos necesarios para las propiedades del cliente -->
            <div class="space-y-1">
                <label
                    for="property1"
                    class="block text-sm font-medium text-gray-800 leading-5"
                    >Propiedad 1</label
                >
                <input
                    v-model="form.property1"
                    id="property1"
                    placeholder="Ingrese la propiedad 1"
                    class="input-field text-sm leading-5 w-full"
                />
            </div>
            <div class="space-y-1">
                <label
                    for="property2"
                    class="block text-sm font-medium text-gray-800 leading-5"
                    >Propiedad 2</label
                >
                <input
                    v-model="form.property2"
                    id="property2"
                    placeholder="Ingrese la propiedad 2"
                    class="input-field text-sm leading-5 w-full"
                />
            </div>
            <!-- Agrega más campos según sea necesario -->
        </div>

        <button
            type="submit"
            class="ml-auto bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
        >
            Guardar Cliente
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                property1: "",
                property2: "",
                // Agrega más propiedades según sea necesario
            },
        };
    },
    methods: {
        handleSubmit() {
            // Aquí puedes manejar el envío del formulario
            console.log(this.form);
        },
    },
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
