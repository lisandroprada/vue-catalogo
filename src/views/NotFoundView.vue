<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"
    >
        <div class="text-center">
            <h1 class="text-6xl font-bold text-gray-800 dark:text-gray-200">
                404
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 mt-4">
                Page Not Found
            </p>
            <RouterLink
                to="/"
                class="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >Go Home</RouterLink
            >
        </div>
    </div>
</template>
