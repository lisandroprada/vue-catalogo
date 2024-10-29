import { defineStore } from "pinia";

export const useContratosStore = defineStore("contratos", {
  state: () => ({
    contratos: [
      {
        id: 1,
        cliente: "Cliente 1",
        propiedad: "Propiedad 1",
        fecha: "2023-01-01",
        tipoIncremento: "Anual",
      },
      {
        id: 2,
        cliente: "Cliente 2",
        propiedad: "Propiedad 2",
        fecha: "2023-02-01",
        tipoIncremento: "Semestral",
      },
      // Agrega más contratos ficticios aquí
    ],
  }),
  actions: {
    addContrato(contrato) {
      contrato.id = this.contratos.length + 1;
      this.contratos.push(contrato);
    },
    updateContrato(updatedContrato) {
      const index = this.contratos.findIndex(
        (contrato) => contrato.id === updatedContrato.id,
      );
      if (index !== -1) {
        this.contratos[index] = updatedContrato;
      }
    },
  },
});
