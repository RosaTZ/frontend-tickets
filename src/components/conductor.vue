<template>
    <div>
      <div>
        <input type="text" v-model="cedula" placeholder="cedula" />
        <input type="text" v-model="nombre" placeholder="nombres" />
        <input type="text" v-model="apellidos" placeholder="apellidos" />
        <input type="text" v-model="telefono" placeholder="telefono" />
        <input type="text" v-model="licencia" placeholder="licencia" />
        <input type="date" v-model="nacimiento" placeholder="nacimiento" />
        <input type="text" v-model="direccion" placeholder="dirección" />
        <input type="text" v-model="estado_civil" placeholder="Estado civil" />
        <input type="text" v-model="tipo_seguro" placeholder="Tipo seguro" />
        <input type="text" v-model="aseguradora" placeholder="Aseguradora" />
        <input type="text" v-model="valor" placeholder="Valor" />
        <input type="text-area" v-model="descripcion" placeholder="Descripcion" />
  
        <button @click="registrarConductor()">Guardar</button>
        <button @click="editarConductor()">Editar conductor</button>
      </div>
  
      <div>
        <input type="text" v-model="cc" placeholder="Buscar cedula" />
        <button @click="buscarConductorCedula()">Buscar</button>
        <button @click="buscarConductor()">Listar conductores</button>
      </div>
  
      <div>
        <input type="text" v-model="id" placeholder="id a eliminar">
        <button @click="eliminarConductor()"></button>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { useConductorStore } from "../stores/conductor.js";
  
  let cedula = ref("");
  let nombre = ref("");
  let apellidos = ref("");
  let telefono = ref("");
  let licencia = ref("");
  let nacimiento = ref("");
  let estado_civil = ref("");
  let direccion = ref("");
  let tipo_seguro = ref("");
  let aseguradora = ref("");
  let valor = ref(0);
  let descripcion = ref("");
  let cc = ref("");
  const useConductor = useConductorStore();
  
  async function registrarConductor() {
    let res = await useConductor.registrarConductor({
      cedula: cedula.value,
      nombre: nombre.value,
      apellidos: apellido.value,
      telefono: telefono.value,
      licencia: licencia.value,
      fecha_nacimiento: nacimiento.value,
      direccion: direccion.value,
      seguro: {
        tipo_seguro: tipo_seguro.value,
        aseguradora: aseguradora.value,
        valor: valor.value,
        descripcion: descripcion.value,
      },
    });
    console.log(res);
  }
  
  async function buscarConductor() {
    let buscar = await useConductor.buscarConductor();
    console.log(buscar);
  }
  
  async function buscarConductorCedula() {
    const cedulaCliente = cc.value;
    let res = await useConductor.buscarConductorCedula(cedulaCliente);
    return res;
  }
  
  async function editarConductor() {
    console.log("-----------------------------");
    const res = await useConductor.editarConductor(
      cedula.value,
      nombre.value,
      apellidos.value,
      telefono.value,
      licencia.value,
      direccion.value,
      estado_civil.value
    );
    console.log(res.buscarConductor);
  }
  async function eliminarConductor(){
    const res= await useConductor.eliminarConductor(id.value)
    console.log(res);  
  }
  </script>