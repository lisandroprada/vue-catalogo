<template>
    <ViewWrapper
        title="Caja"
        subtitle="Gestión de ingresos y egresos, conciliación bancaria y caja chica"
    >
        <CajaTabs />
    </ViewWrapper>
</template>

<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import CajaTabs from "@/components/caja/CajaTabs.vue";
</script>
