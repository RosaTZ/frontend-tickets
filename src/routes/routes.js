import menu from "../components/Menu.vue";
import login from "../src/components/Login.vue";
import infoEmpresa from "../src/components/InformacionEmpresa.vue"
import clientes from "../components/cliente.vue"
import revision from "../components/Revision.vue"
import rutas from "../components/Rutas.vue"
import ticket from "../components/Ticket.vue"
import vehiculos from "../components/vehiculos.vue"
import ventas from "../components/Venta.vue"
import { createRouter, createWebHashHistory } from 'vue-router';
import conductores from '../components/Conductores.vue'

const routes = [
    {path: "/",component: login},
    {path: "/menu",component: menu,
      children: [
        { path: "", redirect: "/menu" },
        { path: "/infoEmpresa", component: infoEmpresa },
        { path: "/clientes", component: clientes },
        { path: "/conductores", component: conductores },
        {path : "/revision" , component : revision},
        {path : "/rutas" , component :rutas},
        {path : "/ticket" , component :ticket},
        {path : "/vehiculos" , component : vehiculos},
        {path : "/venta" , component : ventas}

      ],
    },
  ];
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token') !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/',{ name: 'no-auth-message' });
  } else {
    next();
  }
});