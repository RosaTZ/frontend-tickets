<template>
  <div>
    <div class="q-pa-md mt-2">
      <div class="row">
        <div class="col-1">
          <q-btn
            color="secondary"
            label="Registrar nueva revision"
            @click="
              (modalRegistrar = true),
                (modalBuscar = false),
                (modalEditar = false)
            "
          />
        </div>
        <div class="col-10">
          <h6 id="tituloTabla">Contro de Revisiones Autos</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Tecnomecanica</th>
                  <th>Fecha revisión</th>
                  <th>Fecha proxima revisión</th>
                  <th>Descripción</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in revisiones" :key="p">
                  <td>{{ p.tecnomecanica }}</td>
                  <td>{{ p.fecha_revision }}</td>
                  <td>{{ p.fecha_proxima_revision }}</td>
                  <td>{{ p.descripcion }}</td>
                  <td><i class="fa-regular fa-pen-to-square" @click="editarRevision(p)" id="editar" ></i></td>
                  <div @click="cambiarEstado(p)">
                    <td v-if="p.estado === 1"><button>Activo</button></td>
                    <td v-else><button>Inactivo</button></td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-1">
          <div class="buscador mt-3">
            <button @click="(buscarClient = true), buscarRevisionId()">
              buscar
            </button>
            <input type="text" placeholder="id" v-model="id" />
          </div>
          <!-- ........................................... -->
          <div id="modalBuscar" v-if="modalBuscar === true">
            <div v-for="b in buscar" :key="b">
              <div @click="modalBuscar = false">❎</div>
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
          <!-- ........................................... -->
        </div>
      </div>
    </div>
    <!-- ............................................ -->
    <div>
      <div></div>
    </div>
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Registrar revision</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <span>Tecnomecanica</span>
          <input type="text" v-model="tecnomecanica" placeholder="" />
          <span>Fecha de la revision</span>
          <input
            type="date"
            v-model="fecha_revision"
            placeholder="Fecha revisión"
          />
          <span>Fecha proxima revision</span>
          <input
            type="date"
            v-model="fecha_proxima_revision"
            placeholder="Fecha de la siguiente revisión"
          />
          <span>Descripcion</span>
          <input type="text" v-model="descripcion" placeholder="" />
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarRevision()">Guardar</button>
        </div>
      </div>
    </div>

    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Editar cliente {{ name }}</h2>
        </div>
        <div class="modal-body">
          <span>Tecnomecanica</span>
          <input type="text" v-model="tecnomecanica" placeholder="" />
          <span>Fecha de la revision</span>
          <input
            type="date"
            v-model="fecha_revision"
            placeholder="Fecha revisión"
          />
          <span>Fecha proxima revision</span>
          <input
            type="date"
            v-model="fecha_proxima_revision"
            placeholder="Fecha de la siguiente revisión"
          />
          <span>Descripcion</span>
          <input type="text" v-model="descripcion" placeholder="" />
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalEditar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
        </div>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRevisionStore } from "../stores/revision.js";
let modalEditar = ref(false);
let modalRegistrar = ref(false);
let modalBuscar = ref(false);
let idEditar = ref("");
let revisiones = ref([]);
let tecnomecanica = ref("");
let fecha_revision = ref("");
let fecha_proxima_revision = ref("");
let descripcion = ref("");
let id = ref("");
let buscar = ref([]);
const useRevision = useRevisionStore();

async function registrarRevision() {
  let res = await useRevision.registrarRevision({
    tecnomecanica: tecnomecanica.value,
    fecha_revision: fecha_revision.value,
    fecha_proxima_revision: fecha_proxima_revision.value,
    descripcion: descripcion.value,
    estado: 0,
  });
  console.log(res);
  buscarRevision();
}

async function buscarRevision() {
  revisiones.value = await useRevision.buscarRevision();
  console.log(revisiones.value);
}
buscarRevision();

async function buscarRevisionId() {
  buscar.value = await useRevision.buscarRevisionId(id.value);
  modalBuscar.value = true;
  return buscar.value;
}

async function editarRevision(p) {
  idEditar.value = p._id;
  tecnomecanica.value = p.tecnomecanica;
  fecha_revision.value=p.fecha_revision
  fecha_proxima_revision.value = p.fecha_proxima_revision;
  descripcion.value=p.descripcion
  modalEditar.value = true;
  modalRegistrar.value = false;
  console.log(idEditar.value);
}
async function guardarEdicion() {
  const res = await useRevision.editarRevision(
    idEditar.value,
    tecnomecanica.value,
    fecha_proxima_revision.value
  );
  console.log(res);
  buscarRevision();
}
async function cambiarEstado(p) {
  if (p.estado === 1) {
    p.estado = 0;
  } else {
    p.estado = 1;
  }
  const res = await useRevision.cambiarEstado(p._id, p.estado);
  console.log(res);
  buscarRevision();
}
</script>