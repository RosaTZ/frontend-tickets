<template>
    <div>
      <div>
        <input type="text" v-model="codigo" placeholder="cedula" />
        <input type="date" v-model="fecha_venta" placeholder="Fecha venta" />
        <input type="date" v-model="fecha_salida" placeholder="Fecha salida" />
        <input type="text" v-model="numero_puesto" placeholder="Numero puesto" />
        <input type="text" v-model="cliente" placeholder="Cliente" />
        <input type="date" v-model="vehiculo" placeholder="Vehiculo" />
        <input type="date" v-model="ruta" placeholder="Ruta" />
        <input type="text" v-model="empresa" placeholder="Empresa" />
        <button @click="registrarTicket()">Guardar</button>
        <button @click="editarTicket()">Editar ticket</button>
      </div>
  
      <div>
        <input type="text" v-model="id" placeholder="Buscar cedula" />
        <button @click="buscarTicketId()">Buscar</button>
        <button @click="buscarTicket()">Listar conductores</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useTicketStore } from "../stores/ticket.js";
  import { useClienteStore } from "../stores/cliente";
  
  let codigo = ref("");
  let fecha_venta = ref("");
  let fecha_salida = ref("");
  let numero_puesto = ref("");
  let id = ref("");
  
  const useTicket = useTicketStore();
  
  async function registrarTicket() {
    let res = await useTicket.registrarTicket({
      codigo: codigo.value,
      fecha_venta: fecha_venta.value,
      fecha_salida: fecha_salida.value,
      numero_puesto: numero_puesto.value,
    });
    console.log(res);
  }
  
  async function buscarTicket() {
    let buscar = await useTicket.buscarTicket();
    console.log(buscar);
  }
  
  async function buscarTicketId() {
    let res = await useTicket.buscarTicketId(id.value);
    return res;
  }
  
  async function editarTicket() {
    const res = await useTicket.editarTicket(id.value, fecha_salida.value);
    console.log(res);
  }
  async function eliminarTicket() {
    const res = await useTicket.eliminarTicket(id.value);
    console.log(res);
  }
  </script>