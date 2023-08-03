<template>
  <div>
    
   <div v-for="e in empresas" :key="e">
<h1>{{ e.nombre }}</h1>
<h6>{{ e.slogan }}</h6>
<h5>Misión</h5>
<p>{{e.mision}}</p>
<h5>Visión</h5>
<p>{{e.vision}}</p>
<small>NIT: {{ e.nit }}</small>
<small>Telefono: {{ e.telefono }}</small>
<small>Direccion: {{ e.direccion }}</small>
   </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useEmpresaStore } from "../stores/empresa.js";

const useEmpresa = useEmpresaStore();
let empresas = ref([]);

async function buscarEmpresa() {
  empresas.value = await useEmpresa.buscarEmpresa();
  console.log(empresas.value);
} 
buscarEmpresa()
</script>