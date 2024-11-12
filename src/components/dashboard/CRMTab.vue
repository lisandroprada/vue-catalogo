<template>
    <div class="mt-8">
        <h2 class="text-xl font-semibold">CRM y Seguimiento de Clientes</h2>
        <ClientMessages :messages="clientMessages" />
        <ClientBirthdays :birthdays="clientBirthdays" />
    </div>
</template>

<script setup>
import ClientMessages from "@/components/dashboard/ClientMessages.vue";
import ClientBirthdays from "@/components/dashboard/ClientBirthdays.vue";

const props = defineProps({
    clientMessages: Array,
    clientBirthdays: Array,
});
</script>
