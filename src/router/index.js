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
import AccessDeniedView from "../views/AccessDeniedView.vue"; // Nueva vista de acceso denegado
import { useAuthStore } from "@/stores/authStore";

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
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/clientes",
    name: "clientes",
    component: () => import("@/views/ClientesView.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin", "user"],
    },
  },
  {
    path: "/propiedades",
    name: "propiedades",
    component: PropiedadesView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/propiedades/:id",
    name: "propiedad-detalle",
    component: () => import("../views/PropiedadDetalleView.vue"),
    props: true,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/ReportsView.vue"),
    meta: { requiresAuth: true, roles: ["admin", "super-user"] },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/creditos",
    name: "creditos",
    component: CreditosView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/contratos",
    name: "contratos",
    component: ContratosView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/proveedores",
    name: "proveedores",
    component: ProveedoresView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/bancos",
    name: "bancos",
    component: BancosView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/blank",
    name: "blank",
    component: BlankView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: { requiresAuth: true, roles: ["admin"] },
  },
  {
    path: "/caja",
    name: "caja",
    component: CajaView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/crm",
    name: "crm",
    component: CRMView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/facturacion",
    name: "facturacion",
    component: FacturacionView,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
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
    path: "/access-denied",
    name: "access-denied",
    component: AccessDeniedView,
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
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiredRoles = to.meta.roles;

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
    return;
  }

  if (requiredRoles && !authStore.hasAnyRole(requiredRoles)) {
    next({ name: "access-denied" });
    return;
  }

  next();
});

export default router;
