<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-red-600 mb-4">
                Acceso Denegado
            </h1>
            <p class="text-gray-600 mb-6">
                No tienes los permisos necesarios para acceder a esta página.
            </p>
            <div class="space-x-4">
                <router-link to="/dashboard" class="btn-primary">
                    Volver al Dashboard
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
// No se necesita lógica adicional
</script>
