import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import ClientesView from "../views/ClientesView.vue";
import SettingsView from "../views/SettingsView.vue";
import PropiedadesView from "../views/PropiedadesView.vue";
import ContratosView from "../views/ContratosView.vue";
import CreditosView from "../views/CreditosView.vue";
import ProveedoresView from "../views/ProveedoresView.vue";
import BancosView from "../views/BancosView.vue";
import BlankView from "../views/BlankView.vue";
import UsersView from "../views/UsersView.vue";
import CajaView from "../views/CajaView.vue";
import CRMView from "../views/CRMView.vue";
import FacturacionView from "../views/FacturacionView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/clientes",
    name: "clientes",
    component: ClientesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/propiedades",
    name: "propiedades",
    component: PropiedadesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/propiedades/:id",
    name: "propiedad-detalle",
    component: () => import("../views/PropiedadDetalleView.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/ReportsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/creditos",
    name: "creditos",
    component: CreditosView,
    meta: { requiresAuth: true },
  },
  {
    path: "/contratos",
    name: "contratos",
    component: ContratosView,
    meta: { requiresAuth: true },
  },
  {
    path: "/proveedores",
    name: "proveedores",
    component: ProveedoresView,
    meta: { requiresAuth: true },
  },
  {
    path: "/bancos",
    name: "bancos",
    component: BancosView,
    meta: { requiresAuth: true },
  },
  {
    path: "/blank",
    name: "blank",
    component: BlankView,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/caja",
    name: "caja",
    component: CajaView,
    meta: { requiresAuth: true },
  },
  {
    path: "/crm",
    name: "crm",
    component: CRMView,
    meta: { requiresAuth: true },
  },
  {
    path: "/facturacion",
    name: "facturacion",
    component: FacturacionView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  console.log(`Navigating to: ${to.name}, Authenticated: ${isAuthenticated}`);
  if (
    !isAuthenticated &&
    !["login", "register", "forgot-password"].includes(to.name)
  ) {
    console.log("Not authenticated, redirecting to login");
    next({ name: "login" });
  } else if (isAuthenticated && to.matched.length === 0) {
    console.log("Authenticated but route not found, redirecting to not-found");
    next({ name: "not-found" });
  } else {
    next();
  }
});

export default router;
