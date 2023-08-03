<template>
  <div>
    <div class="q-pa-md mt-2">
      <div class="row">
        <!--BOTON REGISTRAR NUEVO VEHICULO -->
        <div class="col-1">
          <q-btn id="nuevo"
            color="secondary"
            label="Registrar nuevo vehiculo"
            @click="(modalRegistrar = true),(modalBuscar=false),(modalEditar=false)"
          />
        </div>
        <!-- INICIO TABLA DE VEHICULOS EN LA BASE DE DATOS -->
        <div class="col-9">
          <h6 id="tituloTabla">Vehiculos registrados</h6>
          <div class="table-container">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Matricula</th>
                  <th>Placa</th>
                  <th>Número del vehiculo</th>
                  <th>Propietario</th>
                  <th>Puestos</th>
                  <th>Nombre conductor</th>
                  <th>tecnomecanica</th>
                  <th>Editar</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in vehiculos" :key="p">
                  <td>{{ p.matricula }}</td>
                  <td>{{ p.placa }}</td>
                  <td>{{ p.num_vehiculo }}</td>
                  <td>{{ p.propietario }}</td>
                  <td>{{ p.puestos }}</td>
                  <td>{{ p.conductor_id.nombre }}</td>
                  <td>{{ p.revision_id.tecnomecanica }}</td>
                  <td><button @click="editarVehiculo(p)">Edit</button></td>
                  <div @click="cambiarEstado(p)">
                    <td v-if="p.estado === 1"><q-btn id="nuevo" color="secondary" label="Activo"></q-btn></td>
                    <td v-else><q-btn id="nuevo" color="warning" label="Inactivo"></q-btn> </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- OPCION DE BUSCAR VEHICULO POR EL ID -->
        <div class="col-2">
          <div class="buscador mt-3">
            <button @click="(buscarClient = true), buscarVehiculoId()">
              buscar
            </button>
            <input type="text" placeholder="id del vehiculo" v-model="id" />
          </div>
        </div>
        <!-- FIN OPCION BUSCAR -->
        <!-- INICIO RSULTADO DE LA BUSQUEDA POR ID -->
        <div id="modalBuscar" v-if="modalBuscar===true">
      <div v-for="b in buscar" :key="b">
      <div @click="(modalBuscar=false)">❎</div>
      <span>Matricula</span>
      <span>{{ b.matricula }}</span>
      <span>Placa</span>
      <span>{{ b.placa }}</span>
      <span>Número del vehiculo</span>
      <span>{{ b.num_vehiculo }}</span>
      <span>Propietario</span>
      <span>{{ b.propietario }}</span>
      <span>Número puestos</span>
      <span>{{ b.puestos }}</span>
      </div>
    </div>
    <!-- FIN RESULTADO DE LA BUSQUEDA -->
      </div>
    </div>
<!-- MODAL CON LOS CAMPOS PARA REGISTRAR UN NUEVO VEHICULO -->
    <div class="modal-bg" id="modal" v-if="modalRegistrar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar vehiculo</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <!-- SELECT DE LOS CONDUCTORES -->
          <div>
            <select @click="idConductor($event)">
              <option value="">Conductores</option>
              <option :value="c._id" v-for="c in conductores" :key="c">
                {{ c.nombre }}
              </option>
            </select>
          </div>
          <!-- SELECT DE LA REVISION -->
          <div>
            <select @click="idRevision($event)">
              <option value="">Revisiones</option>
              <option :value="c._id" v-for="c in revisiones" :key="c">
                {{ c.tecnomecanica }}
              </option>
            </select>
          </div>
          <!-- INPUTS CON LOS CAMPOS A COMPLETAR PARA EL REGISTRO -->
          <input type="text" v-model="matricula" placeholder="matricula" />
          <input type="text" v-model="placa" placeholder="Placa del vehiculo">
          <input type="text" v-model="num_vehiculo" placeholder="Número del vehiculo" />
          <input type="text" v-model="propietario" placeholder="propietario" />
          <span>Número de puestos</span>
          <input type="number" v-model="puestos" placeholder="Número de puestos">
        </div>
        <!-- BOTON REGISTRAR NUEVO VEHICULO -->
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalRegistrar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="registrarVehiculo(),(modalRegistrar=false)">Guardar</button>
        </div>
      </div>
    </div>
<!-- MODAL PARA EDITAR EL VEHICULO -->
    <div class="modal-bg" id="modal" v-if="modalEditar === true">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Agregar Cliente</h2>
          <div v-if="alertaError === true">
            {{ alerta }}
          </div>
        </div>
        <div class="modal-body">
          <input type="text" v-model="placa" placeholder="Placas del vehiculo" />
          <input type="text" v-model="num_vehiculo" placeholder="Número del vehiculo" />
          <input type="text" v-model="propietario" placeholder="propietario" />
        </div>
        <div class="modal-buttons">
          <button id="closeModalBtn" @click="modalEditar = false">
            Cerrar
          </button>
          <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { useVehiculoStore } from "../stores/vehiculo.js";
import { useConductorStore } from "../stores/conductor";
import { useRevisionStore } from "../stores/revision";

let idEditar = ref("");
let modalEditar = ref(false);
let modalRegistrar = ref(false);
let modalBuscar=ref(false)
let vehiculos = ref();
let matricula = ref("");
let placa=ref('')
let num_vehiculo = ref("");
let propietario = ref("");
let puestos=ref(0)
let conductorId=ref('')
let revisionId=ref('')
let id = ref("");
let buscar=ref([])
let conductores=ref([])
let revisiones=ref([])
const useVehiculo = useVehiculoStore();
const useConductor=useConductorStore();
const useRevision=useRevisionStore()

async function traerConductor() {
  conductores.value = await useConductor.buscarConductor();
}
async function traerRevision() {
  revisiones.value = await useRevision.buscarRevision();
}
async function idConductor(e){
conductorId.value=e.target.value
console.log('conductor '+conductorId.value);
}
async function idRevision(e){
revisionId.value=e.target.value
console.log('revision '+revisionId.value);
}
async function registrarVehiculo() {
  let res = await useVehiculo.registrarVehiculo({
    matricula: matricula.value,
    placa:placa.value,
    num_vehiculo: num_vehiculo.value,
    propietario: propietario.value,
    puestos:puestos.value,
    conductor_id: conductorId.value,
    revision_id:revisionId.value,
    estado:0
  }); 
  console.log(res);
  buscarVehiculo()
  limpiarCampos()
}
function limpiarCampos() {
  matricula.value='',
  placa.value=''
  num_vehiculo.value='',
  propietario.value='',
  puestos.value=''
  }
async function buscarVehiculo() {
  vehiculos.value = await useVehiculo.buscarVehiculo();
  traerConductor() 
  traerRevision()
}
buscarVehiculo();
async function buscarVehiculoId() {
  buscar.value = await useVehiculo.buscarVehiculoId(id.value);
  modalBuscar.value=true
  return buscar.value;
}
async function editarVehiculo(p) {
  idEditar.value = p._id;
  placa.value=p.placa,
  num_vehiculo.value=p.num_vehiculo,
  propietario.value=p.propietario,
  modalEditar.value = true;
  modalRegistrar.value = false;
  modalBuscar.value=false
  console.log(idEditar.value);
}
async function guardarEdicion() {
  const res = await useVehiculo.editarVehiculo(
    idEditar.value,
    placa.value,
    num_vehiculo.value,
    propietario.value
  );
  console.log(res.data);
  buscarVehiculo() 
}
async function cambiarEstado(p){
  if(p.estado===1){
    p.estado=0
  }else{
    p.estado=1
  }
  const res= await useVehiculo.cambiarEstado(p._id,p.estado)
  console.log(res.data);
  buscarVehiculo()
}
</script>