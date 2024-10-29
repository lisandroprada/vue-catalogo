import { defineStore } from "pinia";
import axios from "axios";

export const useCRMStore = defineStore("crmStore", {
  state: () => ({
    cases: [],
  }),
  actions: {
    async fetchCases() {
      try {
        const response = await axios.get("http://localhost:3002/api/crm/cases");
        this.cases = response.data;
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    },
    async createCase(crmCase) {
      try {
        const response = await axios.post(
          "http://localhost:3002/api/crm/cases",
          crmCase,
        );
        this.cases.push(response.data);
      } catch (error) {
        console.error("Error creating case:", error);
      }
    },
    async updateCase(crmCase) {
      try {
        const response = await axios.put(
          `http://localhost:3002/api/crm/cases/${crmCase.id}`,
          crmCase,
        );
        const index = this.cases.findIndex((c) => c.id === crmCase.id);
        if (index !== -1) {
          this.cases[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating case:", error);
      }
    },
    async deleteCase(caseId) {
      try {
        await axios.delete(`http://localhost:3002/api/crm/cases/${caseId}`);
        this.cases = this.cases.filter((c) => c.id !== caseId);
      } catch (error) {
        console.error("Error deleting case:", error);
      }
    },
  },
});
