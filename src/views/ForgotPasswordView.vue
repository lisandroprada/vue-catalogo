<template>
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
        <div
            class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24"
        >
            <div class="mx-auto max-w-lg text-center">
                <h1 class="text-2xl font-bold sm:text-3xl">
                    Recuperar Contraseña
                </h1>
                <p class="mt-4 text-gray-500">
                    Ingresa tu correo electrónico para recibir un enlace de
                    recuperación.
                </p>
            </div>
            <form
                @submit.prevent="handleForgotPassword"
                class="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
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
                <div class="mt-6">
                    <button
                        type="submit"
                        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Enviar Enlace de Recuperación
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

const email = ref("");
const router = useRouter();

const handleForgotPassword = () => {
    console.log("Recuperar Contraseña", { email: email.value });
    // Aquí iría tu lógica de recuperación de contraseña
    router.push("/login");
};
</script>
