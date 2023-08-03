<template>
  <div>
      <div class="q-pa-md mt-2 " >  

<div class="row">
    <div class="col-2">
      <q-btn color="secondary" label="Registrar nuevo cliente" @click="(modalRegistrar=true)" />
    </div>
    <div class="col-8">
      <h6 id="tituloTabla">Clientes </h6>
            <div class="table-container">

           
          <table class="custom-table">
            
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Editar</th>
            <th>Estado</th>


          </tr>
        </thead>
        <tbody>
          <tr v-for="p in clientes" :key="p">
            <td>{{ p.cedula }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ p.apellidos }}</td>
            <td>{{ p.telefono }}</td>
            <td ><i  id="editar" class="fa-regular fa-pen-to-square" @click="editarCliente(p) "></i></td>
            <div @click="cambiarEstado(p)">
            <td v-if="p.estado===1"><button>Activo</button></td>
          <td v-else><button>Inactivo</button></td>
          </div>
          </tr>
        </tbody>
      </table>

          </div> 

    </div>
    <div class="col-2">
      <div class="buscador mt-3">
              <button @click=" buscarClient=true ,buscarClienteCedula()">buscar</button>
              <input type="text" placeholder="cedula" v-model="cc">
      </div>
    
    </div>
</div>
</div>

      <!-- modal registrar -->
      <div class="modal-bg" id="modal" v-if="modalRegistrar===true">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Agregar Cliente</h2>
                <!-- <div v-if="alertaError===true">
                  {{ alerta }}
                </div> -->
  <!-- <div  v-if="res.response.data.errors.length>0">
    <ul>
      <li v-for="(e, i) in res.response.data.errors" :key="i">{{ e.msg }}</li>
    </ul>
  </div> -->
            </div>
            <div class="modal-body">
              <input id="cedula" type="text" v-model="cedula" placeholder="cedula" />
              <input type="text" v-model="nombre" placeholder="nombres" />
              <input type="text" v-model="apellido" placeholder="apellidos" />
              <input type="text" v-model="telefono" placeholder="telefono" />
            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalRegistrar=false">Cerrar</button>
                <button id="saveBtn" @click="registrarCliente()">Guardar</button>
            </div>
        </div>
    </div>
    <!-- modal buscar cliente -->
    <div class="modal-bg" id="modal" v-if="buscarClient===true">
        <div class="modal-content">
            <div class="modal-header">
                <h2>{{ name }}</h2>
                <div v-if="alertaError===true">
                  {{ alerta }}
                </div>
            </div>
            <div class="modal-body">
              <h6 id="tituloTabla">Clientes </h6>
            <div class="table-container">
          <table class="custom-table">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Telefono</th>
            <th>Editar</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in buscar.cliente" :key="p">
            <td>{{ p.cedula }}</td>
            <td>{{ p.nombre }}</td>
            <td>{{ p.apellidos }}</td>
            <td>{{ p.telefono }}</td>
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
                <button id="closeModalBtn" @click="buscarClient=false">Cerrar</button>
                <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
            </div>
        </div>
    </div>

    <!-- Editar telefono -->
    <div class="modal-bg" id="modal" v-if="modalEditar===true">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Editar cliente {{ name }}</h2>
                <!-- <div v-if="alertaError===true">
                  {{ alerta }}
                </div> -->
                
            </div>
            <div class="modal-body">
              <input type="text" v-model="numTelefono" placeholder="telefono" />
            </div>
            <div class="modal-buttons">
                <button id="closeModalBtn" @click="modalEditar=false">Cerrar</button>
                <button id="saveBtn" @click="guardarEdicion()">Guardar</button>
            </div>
        </div>
    </div>

      <div>
  <div>
  </div>

      <div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
//   import axios from "axios";
  import axios, { AxiosError } from "axios";
import { ref } from "vue";
  import { useClienteStore } from "../stores/cliente.js"
  
  let buscarClient=ref(false)
  let alertaError=ref(false)
  let alerta =ref('')
  let cedula = ref("");
  let nombre = ref("");
  let apellido = ref("");
  let telefono = ref("");
  let numTelefono=ref('')
  let idEditar=ref('')
  let modalEditar=ref(false)
  let modalRegistrar=ref(false)
  let clientes=ref()
  let cc=ref('')
  let buscar=ref([])
  const useCliente = useClienteStore();

 async function traerError(){
console.log('---------------------------');
console.log(useCliente.errors);
console.log('---------------------------');
 }

async function registrarCliente() {
  traerError()
  let res = await useCliente.registrarCliente({
   cedula: cedula.value,
   nombre: nombre.value,
   apellidos: apellido.value,
   telefono: telefono.value,
 });
 console.log(res);
//  limpiarCampos()
//  buscarCliente()

}
  // async function registrarCliente() {
 
  //   let res = await useCliente.registrarCliente({
  //     cedula: cedula.value,
  //     nombre: nombre.value,
  //     apellidos: apellido.value,
  //     telefono: telefono.value,
  //   });
  //   console.log(res);
  //   // limpiarCampos()
  //   buscarCliente()
  
  // }
  function limpiarCampos() {
    cedula.value=''
    nombre.value=''
    apellido.value=''
    telefono.value=''
  }
  
  async function buscarCliente(){
    clientes.value= await useCliente.buscarCliente()
    console.log(clientes.value);
  }
  buscarCliente()
  async function buscarClienteCedula() {
    const cedulaCliente = cc.value; 
    buscar.value = await useCliente.buscarClienteCedula(cedulaCliente);
    // modalBuscar.value=true
    return buscar.cliente;
  }
  
  async function editarCliente(p){
  idEditar.value=p._id
  numTelefono.value=p.telefono
  modalEditar.value=true
  modalRegistrar.value=false
  console.log(idEditar.value);
}
  async function guardarEdicion(){
    const res= await useCliente.editarCliente(idEditar.value,numTelefono.value)
    console.log(res);
    buscarCliente()
  }
  async function cambiarEstado(p){
  if(p.estado===1){
    p.estado=0
  }else{
    p.estado=1
  }
  const res= await useCliente.cambiarEstado(p._id,p.estado)
  console.log(res.data);
  buscarCliente()
}
 
  </script>