<template>
    <div>
        <div>
    <input type="text" v-model="tecnomecanica" placeholder="tecnomecanica">
    <input type="date" v-model="fecha_revision" placeholder="Fecha revisión">
    <input type="date" v-model="fecha_proxima_revision" placeholder="Fecha proxima revisión">
    <input type="text" v-model="descripcion" placeholder="Descripcion">
<button @click="registrarRevision()">Guardar</button>
<button @click="editarRevision()">Editar revisión</button>
</div>

<div>
<input type="text" v-model="id" placeholder="Buscar Revisión">
<button @click="buscarRevisionId()">Buscar</button>
<button @click="buscarRevision()">Listar revisión</button>
        </div>

    </div>
 
</template>

<script setup>
import {ref} from "vue"
import {useRevisionStore} from "../stores/revision.js"

let tecnomecanica=ref('')
let fecha_revision=ref('')
let fecha_proxima_revision=ref('')
let descripcion=ref('')
let id=ref('')
const useRevision=useRevisionStore()

async function registrarRevision(){
    let res= await useRevision.registrarRevision({
       tecnomecanica: tecnomecanica.value,
       fecha_revision: fecha_revision.value,
       fecha_proxima_revision: fecha_proxima_revision.value,
       descripcion: descripcion.value
    })
    console.log(res);
}

async function buscarRevision(){
  let buscar= await useRevision.buscarRevision()
  return buscar
}


  async function buscarRevisionId() { 
    let res = await useRevision.buscarRevisionId(id.value);
    return res;
  }

  async function editarRevision() {
  const res = await useRevision.editarRevision(
   id.value,
   tecnomecanica.value,
   fecha_proxima_revision.value
  );
  console.log(res);
}

async function eliminarRevision(){
  const res= await useRevision.eliminarRevision(id.value)
  console.log(res);  
}

</script>