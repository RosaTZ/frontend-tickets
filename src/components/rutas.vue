<template>
  <div>
    <div class="q-pa-md mt-2">
      <div class="row">
      <!-- BOTON REGISTRAR NUEVA RUTA -->
        <div class="col-2">
          <q-btn
            color="secondary"
            label="Registrar nueva ruta"
            @click="(modalRegistrar = true),(modalBuscar=false),(modalEditar=false)"
          />
        </div>
        <!-- TABLA TODAS LAS RUTAS-->
        <div class="col-8">
          <h6 id="tituloTabla">Rutas de la empresa</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Origen</th>
                  <th>Desctino</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in rutas" :key="p">
                  <td>{{ p.codigo }}</td>
                  <td>{{ p.origen }}</td>
                  <td>{{ p.destino }}</td>
                  <!-- BOTON EDITAR RUTA -->
                  <td>
                    <i
                      class="fa-regular fa-pen-to-square"
                      @click="editarRuta(p)"
                      id="editar"
                    ></i>
                  </td>
                  <!-- CAMBIO DE ESTADO -->
                  <div @click="cambiarEstado(p)">
                    <td v-if="p.estado === 1">Activo</td>
                    <td v-else>Inactivo</td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
         <!-- FIN TABLA -->

         <!-- BUSCAR RUTA POR ID -->
        <div class="col-2">
          <div class="buscador mt-3">
            <button @click="buscarRutaId()">
              buscar
            </button>
            <input type="text" placeholder="Ruta a buscar" v-model="id" />
          </div>
        </div>
        <!-- INFORMACION DE LA RUTA BUSCADA POR ID -->
        <div id="modalBuscar" v-if="modalBuscar===true">
      <div v-for="b in buscar" :key="b">
      <div @click="(modalBuscar=false)">❎</div>
      <span>Tecnomecanica</span>
      <span>{{ b.tecnomecanica }}</span>
      <span>Fecha revisión</span>
      <span>{{ b.fecha_revision }}</span>
      <span>Fecha proxima revisión</span>
      <span>{{ b.fecha_proxima_revision }}</span>
      <span>Descripcion</span>
      <span>{{ b.descripcion }}</span>
      </div>
    </div>
    <!-- FIN DE LA INFORMACION RUTA -->
      </div>
    </div>

    <!-- MODAL REGISTRAR NUEVA RUTA-->
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Registrar Ruta</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <input type="text" v-model="codigo" placeholder="Codigo" />
          <input type="text" v-model="origen" placeholder="origen" />
          <input type="text" v-model="destino" placeholder="Destino" />
          <input
            type="text"
            v-model="tiempo"
            placeholder="Hora estimada de llegada"
          />
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarRuta()">Guardar</button>
        </div>
      </div>
    </div>
<!-- MODAL EDITAR RUTAS -->
    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar ruta {{ name }}</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <input type="date" v-model="origen" placeholder="Origen" />
          <input type="date" v-model="destino" placeholder="Destino" />
          <input
            type="text"
            v-model="tiempo"
            placeholder="Hora estimada de llegada"
          />
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalEditar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
        </div>
      </div>
    </div>
    <!-- FIN MODAL EDITAR RUTAS -->
    <!-- ................................. -->
    <div></div>
    <div></div>
  </div>
</template>
 
 <script setup>
import { ref } from "vue";
import { useRutaStore } from "../stores/rutas.js";

let idEditar = ref("");
let modalEditar = ref(false);
let modalRegistrar = ref(false);
let modalBuscar = ref(false);
let rutas = ref();
let codigo = ref("");
let origen = ref("");
let destino = ref("");
let id = ref("");
let buscar = ref([]);
const useRuta = useRutaStore();

async function registrarRuta() {
  let res = await useRuta.registrarRuta({
    codigo: codigo.value,
    origen: origen.value,
    destino: destino.value,
    salida: salida.value,
    tiempo: tiempo.value,
  });
  console.log(res);
  buscarRuta();
}

async function buscarRuta() {
  rutas.value = await useRuta.buscarRuta();
  console.log(rutas.value);
}
buscarRuta();

async function buscarRutaId() {
  buscar.value = await useRuta.buscarRutaId(id.value);
  modalBuscar.value = true;
  return buscar.value.ruta;
}

async function editarRuta(p) {
  idEditar.value = p._id;
  origen.value = p.origen;
  destino.value = p.destino;
  modalEditar.value = true;
  modalRegistrar.value = false;
  console.log(idEditar.value);
}
async function guardarEdicion() {
  const res = await useRuta.editarRuta(
    idEditar.value,
    origen.value,
    destino.value,
    salida.value,
    tiempo.value
  );
  console.log(res);
  buscarRuta();
}
async function cambiarEstado(p) {
  if (p.estado === 1) {
    p.estado = 0;
  } else {
    p.estado = 1;
  }
  const res = await useRuta.cambiarEstado(p._id, p.estado);
  console.log(res.data);
  buscarRuta();
}
</script>
<style>
#modalBuscar span{
  display: block;
}
</style>