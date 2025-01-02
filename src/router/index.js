// Views - App
import DashboardView from "../views/app/DashboardView.vue";
import PropiedadesView from "../views/app/PropiedadesView.vue";
import ContratosView from "../views/app/ContratosView.vue";
import CreditosView from "../views/app/CreditosView.vue";
import ProveedoresView from "../views/app/ProveedoresView.vue";
import BancosView from "../views/app/BancosView.vue";
import BlankView from "../views/app/BlankView.vue";
import CajaView from "../views/app/CajaView.vue";
import CRMView from "../views/app/CRMView.vue";
import FacturacionView from "../views/app/FacturacionView.vue";

// Views - Admin
import SettingsView from "../views/admin/SettingsView.vue";
import UsersView from "../views/admin/UsersView.vue";
import ProfileView from "../views/admin/ProfileView.vue";

// Views - Auth
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import ForgotPasswordView from "../views/auth/ForgotPasswordView.vue";
import NotFoundView from "../views/auth/NotFoundView.vue";
import AccessDeniedView from "../views/auth/AccessDeniedView.vue";

// Vue Router y Store
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// Meta configuraciones comunes
const defaultMeta = {
  requiresAuth: true,
  roles: ["admin", "super-user", "user"]
};

const adminMeta = {
  requiresAuth: true,
  roles: ["admin"]
};

// Definición de rutas por grupos
const authRoutes = [
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
];

const adminRoutes = [
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    meta: adminMeta,
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: adminMeta,
  },
];

const appRoutes = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: defaultMeta,
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
    meta: defaultMeta,
  },
  {
    path: "/propiedades/:id",
    name: "propiedad-detalle",
    component: () => import("../views/app/PropiedadDetalleView.vue"),
    props: true,
    meta: defaultMeta,
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("../views/app/ReportsView.vue"),
    meta: { requiresAuth: true, roles: ["admin", "super-user"] },
  },
  {
    path: "/creditos",
    name: "creditos",
    component: CreditosView,
    meta: defaultMeta,
  },
  {
    path: "/contratos",
    name: "contratos",
    component: ContratosView,
    meta: defaultMeta,
  },
  {
    path: "/proveedores",
    name: "proveedores",
    component: ProveedoresView,
    meta: defaultMeta,
  },
  {
    path: "/bancos",
    name: "bancos",
    component: BancosView,
    meta: defaultMeta,
  },
  {
    path: "/caja",
    name: "caja",
    component: CajaView,
    meta: defaultMeta,
  },
  {
    path: "/crm",
    name: "crm",
    component: CRMView,
    meta: defaultMeta,
  },
  {
    path: "/tasacion",
    name: "tasacion",
    component: () => import("../views/app/TasacionView.vue"),
    meta: defaultMeta,
  },
  {
    path: "/facturacion",
    name: "facturacion",
    component: FacturacionView,
    meta: defaultMeta,
  },
  {
    path: "/profile",
    name: "perfil",
    component: ProfileView,
    meta: defaultMeta,
  },
  {
    path: "/blank",
    name: "blank",
    component: BlankView,
    meta: defaultMeta,
  },
];

// Combinar todas las rutas
const routes = [
  ...appRoutes,
  ...adminRoutes,
  ...authRoutes,
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

// Guard de navegación
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
