<template>
    <div>
    <div>
    <input type="text" v-model="nombre" placeholder="Nombre">
    <input type="text" v-model="nit" placeholder="Nit">
    <input type="text" v-model="direccion" placeholder="direccion">
    <input type="text" v-model="telefono" placeholder="Telefono">
    <input type="text" v-model="propietario" placeholder="Propietario">
<button @click="registrarEmpresa()">Guardar</button>
<button @click="editarEmpresa()">Editar empresa</button>
</div>

<div>
<input type="text" v-model="id" placeholder="Buscar cedula">
<button @click="buscarEmpresaId()">Buscar</button>
<button @click="buscarEmpresa()">Listar Empresa</button>
        </div>

</div>
</template>

<script setup>
import {ref} from "vue"
import {useEmpresaStore} from "../stores/empresa.js"

let nombre=ref('')
let nit=ref('')
let direccion=ref('')
let telefono=ref('')
let propietario=ref('')
let id=ref('')
const useEmpresa=useEmpresaStore()

async function registrarEmpresa(){
    let res= await useEmpresa.registrarEmpresa({
   nombre: nombre.value,
   nit: nit.value,
   direccion: direccion.value,
   telefono: telefono.value,
   propietario: propietario.value
    })
    console.log(res);
}

async function buscarEmpresa(){
  let buscar= await useEmpresa.buscarEmpresa()
  console.log(buscar);
}


  async function buscarEmpresaId() { 
    const idEmpresa=id.value
    let res = await useEmpresa.buscarEmpresaId(idEmpresa);
    return res;
  }

  async function editarEmpresa() {
  const res = await useEmpresa.editarEmpresa(
   id.value,
   nombre.value,
   direccion.value,
   telefono.value,
   propietario.value
  );
  console.log(res);
}

async function eliminarEmpresa(){
  const res= await useEmpresa.eliminarEmpresa(id.value)
  console.log(res);  
}
</script>