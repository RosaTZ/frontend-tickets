<template>
    <div>
      <div v-for="(c,i) in prueba" :key="i">
  <div>{{ c }}</div>
      </div>
      <table>
        <thead>
          <tr>
            <td>Usuario</td>
            <td>nombre</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>no see</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <!-- <div>
        <button>Registrar</button>
        <button @click="(registrar = true), (opcion = true)">Actualizar</button>
        <button>Eliminar</button>
      </div> -->
      <div>
        <input type="text" v-model="cedula" placeholder="cedula" />
        <input type="text" v-model="nombre" placeholder="nombres" />
        <input type="text" v-model="apellido" placeholder="apellidos" />
        <input type="text" v-model="telefono" placeholder="telefono" />
        <button @click="registrarCliente()">
          Guardar
        </button>
      </div>
  
       <div>
        <input type="text" v-model="cedulaCliente" placeholder="cedula">
        <input type="text" v-model="numTelefono" placeholder="Nuevo número">
        <button @click="editarCliente()">realizar cambios</button>
       </div>
  
      <div>
        <input type="text" v-model="cc" placeholder="Digite la cedula a buscar"/>
        <button @click="buscarClienteCedula()">Buscar clientes</button>
      </div>
      <div>
        <!-- <button @click="buscarCliente()">Listar Clientes</button> -->
      </div>
      <div>
        <input type="text" v-model="id" placeholder="Id del cliente a eliminar">
        <button @click="eliminarCliente()">Eliminar cliente</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { useClienteStore } from "../stores/cliente.js";
  
  
  let opcion = ref(false);
  let registrar = ref(false);
  let cedula = ref("");
  let nombre = ref("");
  let apellido = ref("");
  let telefono = ref("");
  let respuesta=ref()
  let cc = ref("");
  let cedulaCliente=ref("")
  let numTelefono=ref('')
  let id=ref('')
  const useCliente = useClienteStore();
  let prueba=useCliente.buscarCliente()
  // console.log(prueba);
  
  async function registrarCliente() {
    let res = await useCliente.registrarCliente({
      cedula: cedula.value,
      nombre: nombre.value,
      apellidos: apellido.value,
      telefono: telefono.value,
    });
    console.log('siiiiiiiiii');
    console.log(res.data.nombre);
  }
  
  // async function buscarCliente(){
  //   const buscar= await useCliente.buscarCliente()
  //   // prueba.value=buscar
  //   console.log(buscar);
  // }
  // buscarCliente()
  
    async function buscarClienteCedula() {
      const cedulaCliente = cc.value; 
      let res = await useCliente.buscarClienteCedula(cedulaCliente);
      return res;
    }
  
  async function editarCliente(){
   const res= await useCliente.editarCliente(cedulaCliente.value,numTelefono.value)
    console.log(res);
  }
  
  async function eliminarCliente(){
    const res= await useCliente.eliminarCliente(id.value)
    console.log(res);  
  }
  </script>