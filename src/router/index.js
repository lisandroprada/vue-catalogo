import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import ClientesView from "../views/ClientesView.vue";
import SettingsView from "../views/SettingsView.vue";
import PropiedadesView from "../views/PropiedadesView.vue";
import CreditosView from "../views/CreditosView.vue";
import ContratosView from "../views/ContratosView.vue";
import ProveedoresView from "../views/ProveedoresView.vue";
import BancosView from "../views/BancosView.vue";
import BlankView from "../views/BlankView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/clientes",
      name: "clientes",
      component: ClientesView,
    },
    {
      path: "/propiedades",
      name: "propiedades",
      component: PropiedadesView,
    },
    {
      path: "/propiedades/:id",
      name: "propiedad-detalle",
      component: () => import("../views/PropiedadDetalleView.vue"),
      props: true,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../views/CalendarView.vue"),
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/ReportsView.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/creditos",
      name: "creditos",
      component: CreditosView,
    },
    {
      path: "/contratos",
      name: "contratos",
      component: ContratosView,
    },
    {
      path: "/proveedores",
      name: "proveedores",
      component: ProveedoresView,
    },
    {
      path: "/bancos",
      name: "bancos",
      component: BancosView,
    },
    {
      path: "/blank",
      name: "blank",
      component: BlankView,
    },
  ],
});

// Actualizar el título de la página basado en la ruta
router.beforeEach((to, from, next) => {
  document.title = `${to.name.charAt(0).toUpperCase() + to.name.slice(1)} - Dashboard`;
  next();
});

export default router;
