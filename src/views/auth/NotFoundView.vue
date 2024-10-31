<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-xl text-gray-600 mb-8">Página no encontrada</p>
        <img
            src="@/assets/images/what-huh.gif"
            alt="John Travolta perdido"
            class="w-64 h-64 mb-8"
        />
        <router-link
            to="/"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Volver al inicio
        </router-link>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped></style>
