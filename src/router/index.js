import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/app/DashboardView.vue";
import SettingsView from "../views/admin/SettingsView.vue";
import PropiedadesView from "../views/app/PropiedadesView.vue";
import ContratosView from "../views/app/ContratosView.vue";
import CreditosView from "../views/app/CreditosView.vue";
import ProveedoresView from "../views/app/ProveedoresView.vue";
import BancosView from "../views/app/BancosView.vue";
import BlankView from "../views/app/BlankView.vue";
import UsersView from "../views/admin/UsersView.vue";
import CajaView from "../views/app/CajaView.vue";
import CRMView from "../views/app/CRMView.vue";
import FacturacionView from "../views/app/FacturacionView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import ForgotPasswordView from "../views/auth/ForgotPasswordView.vue";
import NotFoundView from "../views/auth/NotFoundView.vue";
import AccessDeniedView from "../views/auth/AccessDeniedView.vue"; // Nueva vista de acceso denegado
import ProfileView from "../views/admin/ProfileView.vue";
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
    component: () => import("@/views/app/ClientesView.vue"),
    meta: {
      requiresAuth: true,
      roles: ["admin", "user"],
    },
  },
  {
    path: "/clientes/:id",
    name: "clientes-form",
    component: () => import("@/views/app/ClienteFormView.vue"),
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
    component: () => import("../views/app/PropiedadDetalleView.vue"),
    props: true,
    meta: { requiresAuth: true, roles: ["admin", "super-user", "user"] },
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/app/ReportsView.vue"),
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
    path: "/profile",
    name: "perfil",
    component: ProfileView,
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
    path: "/tasacion",
    name: "tasacion",
    component: () => import("../views/app/TasacionView.vue"),
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
