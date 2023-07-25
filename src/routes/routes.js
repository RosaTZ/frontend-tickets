import login from "../components/login.vue"
import administrador from "../components/administrador.vue"
import inicio from "../components/inicio.vue"
import cliente from "../components/cliente.vue"
import conductor from "../components/conductor.vue"
import empresa from "../components/empresa.vue"
import revision from "../components/revision.vue"
import rutas from "../components/rutas.vue"
import ticket from "../components/ticket.vue"
import vehiculo from "../components/vehiculo.vue"
import vendedor from "../components/vendedor.vue"

import {createRouter , createWebHashHistory} from 'vue-router'

const routes =[
    {path : "/", component : login  },
    {path : "/admin" , component: administrador},
    {path : "/inicio" , component: inicio},
    {path : "/cliente" , component: cliente},
    {path : "/conductor" , component: conductor},
    {path : "/empresa" , component: empresa},
    {path : "/revision" , component: revision},
    {path : "/rutas" , component: rutas},
    {path : "/ticket" , component: ticket},
    {path : "/vehiculo" , component: vehiculo},
    {path : "/vendedor" , component: vendedor}

]

export const router = createRouter(
    {
        history : createWebHashHistory(),
        routes
    }
)