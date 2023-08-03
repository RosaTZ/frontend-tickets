<template>
  <div class="q-pa-md mt-2 " >  

      <div class="row">
          <div class="col-auto">
            <q-btn color="secondary" label="Registrar nuevo conductor" @click="(modalRegistrar=true),(modalEditar=false),(modalBuscar=false)" />
          </div>
          <div class="col-11">
              <h6 id="tituloTabla">Conductores </h6>
              <div class="table-container">           
              <table class="custom-table">
              <thead>
              <tr>
                <th>Cedula</th>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Fecha de nacimiento</th>
        <th>Direccion</th>
        <th>Estado civil</th>
        <th>Telefono</th>
        <th>Licencia</th>
        <th>Categoria Licencia</th>
        <th>Fecha de vencimiento</th>
        <th>Editar</th>
        <th>Estado</th>
              </tr>
              </thead>
              <tbody>
                  <tr v-for="p in conductores" :key="p">
                    <td>{{ p.cedula }}</td>
        <td>{{ p.nombre }}</td>
        <td>{{ p.apellidos }}</td>
        <td>{{ p.fecha_nacimiento }}</td>
        <td>{{ p.direccion }}</td>
        <td>{{ p.estado_civil }}</td>
        <td>{{ p.telefono }}</td>
        <td>{{ p.licencia }}</td>
        <td>{{ p.categoria_licencia }}</td>
        <td>{{ p.fecha_vencimiento }}</td>
                   <td>
                    <i class="fa-regular fa-pen-to-square" @click="editarConductor(p)" id="editar"></i>
                  </td>
                  <div @click="cambiarEstado(p)">
          <td v-if="p.estado===1"><button>Activo</button></td>
        <td v-else><button>Inactivo</button></td>
        </div>
                  </tr>
              </tbody>
              </table>
              
              </div>

          </div>
          <div class="col-1">
          <div>
            <div class="buscador mt-3">
            <button @click=" buscarClient=true ,buscarConductorCedula()">buscar</button>
            <input type="text" placeholder="cedula" v-model="cc">
          </div>
          </div>
          </div>
      </div>
       
      <div id="modalBuscar" v-if="modalBuscar === true">
        <div class="modal-bg" id="modal" v-if="modalBuscar===true">
        <div class="modal-content">
            <div class="modal-body" v-for="p in buscar.conductor" :key="p">
              <h6 id="tituloTabla">Cliente {{ p.nombre }} </h6>
            <div class="table-container"  >
          <table class="custom-table">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Editar</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ p.cedula }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ p.apellidos }}</td>
            <td>{{ p.telefono }}</td>
            <td>{{ p.direccion }}</td>
            <td><button @click="editarCliente(p)">Edit</button></td>
            <div @click="cambiarEstado(p)">
            <td v-if="p.estado===1"><button>Activo</button></td>
          <td v-else><button>Inactivo</button></td>
          </div>
          </tr>
        </tbody>
      </table>

          </div> 

            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalBuscar=false , cc=''">Cerrar</button>
                <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
            </div>
        </div>
    </div>
  </div>
  
  <div class="modal-bg" id="modal" v-if="modalRegistrar===true">
      <div class="modal-content">
          <div class="modal-header">
              <h2>Agregar Cliente</h2>
              <!-- <div v-if="alertaError===true">
                {{ alerta }}
              </div> -->
          </div>
          <div class="modal-body">
    <input type="text" v-model="cedula" placeholder="cedula" />
    <input type="text" v-model="nombre" placeholder="nombres" />
    <input type="text" v-model="apellidos" placeholder="apellidos" />
    <input type="date" v-model="fecha_nacimiento" placeholder="Fecha Nacimiento"/>
    <input type="text" v-model="direccion" placeholder="direccion" />
    <input type="text" v-model="telefono" placeholder="telefono" />
    <input type="text" v-model="estado_civil" placeholder="Estado civil" />
    <input type="text" v-model="licencia" placeholder="licencia" />
    <input type="text" v-model="categoria_licencia" placeholder="Categoria de la licencia"/>
    <input type="date" v-model="fecha_vencimiento" placeholder="Fecha de vencimiento de la licencia"/>
          </div>
          <div class="modal-buttons">
              <button id="closeModalBtn" @click="modalRegistrar=false">Cerrar</button>
              <button id="saveBtn" @click="registrarConductor()">Guardar</button>
          </div>
      </div>
  </div>

  <div class="modal-bg" id="modal" v-if="modalEditar===true">
      <div class="modal-content">
          <div class="modal-header">
              <h2>Agregar Cliente</h2>
              <div v-if="alertaError===true">
                {{ alerta }}
              </div>
          </div>
          <div class="modal-body">
    <input type="text" v-model="cedula" placeholder="cedula" />
    <input type="text" v-model="nombre" placeholder="nombres" />
    <input type="text" v-model="apellidos" placeholder="apellidos" />
    <input type="date" v-model="fecha_nacimiento" placeholder="Fecha Nacimiento"/>
    <input type="text" v-model="direccion" placeholder="direccion" />
    <input type="text" v-model="telefono" placeholder="telefono" />
    <input type="text" v-model="estado_civil" placeholder="Estado civil" />
    <input type="text" v-model="licencia" placeholder="licencia" />
    <input type="text" v-model="categoria_licencia" placeholder="Categoria de la licencia"/>
    <input type="date" v-model="fecha_vencimiento" placeholder="Fecha de vencimiento de la licencia"/>
          </div>
          <div class="modal-buttons">
              <button id="closeModalBtn" @click="modalEditar=false">Cerrar</button>
              <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
          </div>
      </div>
  </div>

</div>

</template>

<script setup>
import { ref } from "vue";
import { useConductorStore } from "../stores/conductor.js";
let modalRegistrar = ref(false);
let modalEditar = ref(false);
let modalBuscar = ref(false);
let idEditar = ref("");
let cedula = ref("");
let nombre = ref("");
let apellidos = ref("");
let telefono = ref("");
let licencia = ref("");
let categoria_licencia = ref("");
let fecha_vencimiento = ref("");
let fecha_nacimiento = ref("");
let estado_civil = ref("");
let direccion = ref("");
let cc = ref("");
let conductores = ref([]);
let buscar = ref([]);
const useConductor = useConductorStore();


async function registrarConductor() {
      console.log("entre");
let res = await useConductor.registrarConductor({
  cedula: cedula.value,
  nombre: nombre.value,
  apellidos: apellidos.value,
  fecha_nacimiento: fecha_nacimiento.value,
  direccion: direccion.value,
  telefono: telefono.value,
  estado_civil: estado_civil.value,
  licencia: licencia.value,
  categoria_licencia: categoria_licencia.value,
  fecha_vencimiento: fecha_vencimiento.value,
  estado:0
});
console.log(res);
buscarConductor()

}

async function buscarConductor() {
conductores.value = await useConductor.buscarConductor();
console.log(conductores.value);
}
buscarConductor()
async function buscarConductorCedula() {
const cedula = cc.value;
buscar.value = await useConductor.buscarConductorCedula(cedula);
modalBuscar.value = true;
return buscar.value.conductor;
}

async function editarConductor(p) {
idEditar.value = p._id;
cedula.value=p.cedula;
nombre.value=p.nombre,
apellidos.value=p.apellidos
telefono.value = p.telefono;
licencia.value = p.licencia;
categoria_licencia.value = p.categoria_licencia;
fecha_vencimiento.value=p.fecha_vencimiento,
fecha_nacimiento.value=p.fecha_nacimiento
direccion.value = p.direccion;
estado_civil.value = p.estado_civil;
modalEditar.value = true;
modalRegistrar.value = false;
}
async function guardarEdicion(){
const res = await useConductor.editarConductor(
idEditar.value,
telefono.value,
licencia.value,
categoria_licencia.value,
fecha_vencimiento.value,
fecha_nacimiento.value,
direccion.value,
estado_civil.value
);
console.log(res.buscarConductor);
buscarConductor();
}
async function cambiarEstado(p){
if(p.estado===1){
  p.estado=0
}else{
  p.estado=1
}
const res= await useConductor.cambiarEstado(p._id,p.estado)
console.log(res.data);
buscarConductor()
}
</script>