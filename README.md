# Catalogo V2

Catalogo V2 es una aplicación web desarrollada con Vue.js y Pinia para la gestión de clientes y propiedades. La aplicación incluye funcionalidades como la visualización de propiedades en un mapa, la gestión de clientes, la simulación de créditos hipotecarios y la generación de reportes.

## Características

- **Gestión de Clientes**: Crear, editar, ver y eliminar clientes.
- **Gestión de Propiedades**: Crear, editar, ver y eliminar propiedades. Visualización de propiedades en un mapa.
- **Simulador de Créditos Hipotecarios**: Simulación de pagos mensuales para créditos hipotecarios.
- **Reportes**: Visualización de estadísticas y gráficos sobre ventas, clientes y categorías.
- **Modo Oscuro**: Soporte para modo oscuro.
- **Responsive Design**: Diseño adaptable a diferentes tamaños de pantalla.

## Tecnologías Utilizadas

- **Vue.js**: Framework principal para la construcción de la interfaz de usuario.
- **Pinia**: Biblioteca de gestión de estado para Vue.js.
- **Vue Router**: Biblioteca de enrutamiento para Vue.js.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **Tailwind CSS**: Framework de CSS para el diseño de la interfaz.
- **Leaflet**: Biblioteca de mapas interactivos.
- **Heroicons**: Conjunto de iconos SVG.
- **V-Calendar**: Biblioteca de calendario para Vue.js.
- **Vue3-Carousel**: Componente de carrusel para Vue.js.
- **Chart.js**: Biblioteca de gráficos.

## Estructura del Proyecto

```bash
catalogo-v2/
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── assets/
│   │   ├── base.css
│   │   ├── components.css
│   │   └── main.css
│   ├── components/
│   │   ├── clientes/
│   │   │   ├── ClienteDrawer.vue
│   │   │   ├── ClientesList.vue
│   │   │   └── FilterDrawer.vue
│   │   ├── icons/
│   │   │   ├── IconCommunity.vue
│   │   │   ├── IconDocumentation.vue
│   │   │   ├── IconEcosystem.vue
│   │   │   ├── IconSupport.vue
│   │   │   └── IconTooling.vue
│   │   ├── layout/
│   │   │   ├── Footer.vue
│   │   │   ├── SideBar.vue
│   │   │   ├── TopBar.vue
│   │   │   └── ViewWrapper.vue
│   │   ├── propiedades/
│   │   │   ├── AddressSearch.vue
│   │   │   ├── FilterDrawer.vue
│   │   │   └── PropiedadForm.vue
│   ├── composables/
│   │   ├── useActiveRoute.js
│   │   └── useDarkMode.js
│   ├── stores/
│   │   ├── clientesStore.js
│   │   ├── menuStore.js
│   │   ├── propiedadesStore.js
│   │   └── useActiveRoute.js
│   ├── views/
│   │   ├── CalendarView.vue
│   │   ├── ClientesView.vue
│   │   ├── CreditosView.vue
│   │   ├── DashboardView.vue
│   │   ├── HomeView.vue
│   │   ├── ProjectsView.vue
│   │   ├── PropiedadDetalleView.vue
│   │   ├── PropiedadesView.vue
│   │   ├── ReportsView.vue
│   │   ├── SettingsView.vue
│   │   └── UsersView.vue
│   ├── App.vue
│   ├── main.js
│   └── router/
│       └── index.js
├── .gitignore
├── package.json
└── README.md
```

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/catalogo-v2.git
cd catalogo-v2
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador y navega a `http://localhost:3000`.

## Configuración

### API

La aplicación se comunica con una API en `http://localhost:3002/api`. Puedes configurar la URL base de la API en el archivo `src/api/axios.js`.

```js
const apiClient = axios.create({
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
```

### Modo Oscuro

El modo oscuro se puede activar y desactivar utilizando el botón en la barra superior. La preferencia del usuario se guarda en `localStorage`.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

¡Gracias por usar Catalogo V2! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactarnos.
