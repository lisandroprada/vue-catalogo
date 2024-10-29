<template>
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
        <div
            class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24"
        >
            <div class="mx-auto max-w-lg text-center">
                <h1 class="text-2xl font-bold sm:text-3xl">Crear una Cuenta</h1>
                <p class="mt-4 text-gray-500">
                    Regístrate para acceder a todas las funcionalidades.
                </p>
            </div>
            <form
                @submit.prevent="handleRegister"
                class="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
                <div>
                    <label for="name" class="sr-only">Nombre</label>
                    <div class="relative">
                        <input
                            type="text"
                            id="name"
                            v-model="name"
                            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Nombre"
                            autocomplete="name"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label for="email" class="sr-only"
                        >Correo Electrónico</label
                    >
                    <div class="relative">
                        <input
                            type="email"
                            id="email"
                            v-model="email"
                            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Correo Electrónico"
                            autocomplete="email"
                            required
                        />
                        <span
                            class="absolute inset-y-0 end-0 grid place-content-center px-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div>
                    <label for="password" class="sr-only">Contraseña</label>
                    <div class="relative">
                        <input
                            type="password"
                            id="password"
                            v-model="password"
                            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Contraseña"
                            autocomplete="new-password"
                            required
                        />
                        <span
                            class="absolute inset-y-0 end-0 grid place-content-center px-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="mt-6">
                    <button
                        type="submit"
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Crear Cuenta
                    </button>
                </div>
            </form>
            <div class="mt-6 text-center">
                <RouterLink
                    to="/login"
                    class="text-sm text-blue-600 hover:underline"
                >
                    Iniciar Sesión
                </RouterLink>
            </div>
        </div>
        <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            <img
                alt="Portada"
                src="@/assets/images/portada.jpg"
                class="absolute inset-0 h-full w-full object-cover"
            />
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const handleRegister = () => {
    console.log("Registrar", {
        name: name.value,
        email: email.value,
        password: password.value,
    });
    // Aquí iría tu lógica de registro
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    router.push("/login");
};
</script>
