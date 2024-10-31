<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <!-- Comunicaciones del Cliente -->
        <div class="md:col-span-1">
            <h3 class="text-base font-semibold text-gray-800">
                Comunicaciones del Cliente
            </h3>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-4 rounded-lg">
            <!-- Mensajes -->
            <div class="space-y-4">
                <h4 class="text-sm font-semibold text-gray-800">Mensajes</h4>
                <textarea
                    v-model="form.newMessage"
                    placeholder="Escribe un mensaje..."
                    class="input-field text-sm leading-5 w-full"
                ></textarea>
                <button
                    @click="addMessage"
                    class="mt-2 text-blue-500 hover:text-blue-700"
                >
                    Agregar Mensaje
                </button>
                <ul class="space-y-2">
                    <li
                        v-for="(message, index) in form.messages"
                        :key="index"
                        class="bg-white p-2 rounded shadow"
                    >
                        {{ message }}
                        <button
                            @click="removeMessage(index)"
                            class="text-red-500 hover:text-red-700 ml-2"
                        >
                            Eliminar
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Notas -->
            <div class="space-y-4 mt-6">
                <h4 class="text-sm font-semibold text-gray-800">Notas</h4>
                <textarea
                    v-model="form.newNote"
                    placeholder="Escribe una nota..."
                    class="input-field text-sm leading-5 w-full"
                ></textarea>
                <button
                    @click="addNote"
                    class="mt-2 text-blue-500 hover:text-blue-700"
                >
                    Agregar Nota
                </button>
                <ul class="space-y-2">
                    <li
                        v-for="(note, index) in form.notes"
                        :key="index"
                        class="bg-white p-2 rounded shadow"
                    >
                        {{ note }}
                        <button
                            @click="removeNote(index)"
                            class="text-red-500 hover:text-red-700 ml-2"
                        >
                            Eliminar
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Documentos -->
            <div class="space-y-4 mt-6">
                <h4 class="text-sm font-semibold text-gray-800">Documentos</h4>
                <input
                    type="file"
                    @change="handleFileUpload"
                    class="input-field text-sm leading-5 w-full"
                />
                <ul class="space-y-2">
                    <li
                        v-for="(document, index) in form.documents"
                        :key="index"
                        class="bg-white p-2 rounded shadow"
                    >
                        {{ document.name }}
                        <button
                            @click="removeDocument(index)"
                            class="text-red-500 hover:text-red-700 ml-2"
                        >
                            Eliminar
                        </button>
                    </li>
                </ul>
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

<script>
export default {
    data() {
        return {
            form: {
                newMessage: "",
                messages: [],
                newNote: "",
                notes: [],
                documents: [],
            },
        };
    },
    methods: {
        addMessage() {
            if (this.form.newMessage) {
                this.form.messages.push(this.form.newMessage);
                this.form.newMessage = "";
            }
        },
        removeMessage(index) {
            this.form.messages.splice(index, 1);
        },
        addNote() {
            if (this.form.newNote) {
                this.form.notes.push(this.form.newNote);
                this.form.newNote = "";
            }
        },
        removeNote(index) {
            this.form.notes.splice(index, 1);
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.form.documents.push(file);
            }
        },
        removeDocument(index) {
            this.form.documents.splice(index, 1);
        },
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
