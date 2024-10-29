<template>
    <ViewWrapper
        title="Facturación"
        subtitle="Gestión de comprobantes y facturas"
    >
        <FacturacionTabs />
    </ViewWrapper>
</template>

<script setup>
import ViewWrapper from "@/components/layout/ViewWrapper.vue";
import FacturacionTabs from "@/components/facturacion/FacturacionTabs.vue";
</script>
