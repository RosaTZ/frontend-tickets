<template>
    <div>
        <div>
            <input type="text" v-model="codigo" placeholder="Codigo">
    <input type="text" v-model="origen" placeholder="Origen">
    <input type="text" v-model="destino" placeholder="Destino">
    <input type="text" v-model="salida" placeholder="Hora salida">
    <input type="text" v-model="tiempo" placeholder="Hora estimada de Llegada">
<button @click="registrarRuta()">Guardar</button>
<button @click="editarRuta()">Editar Ruta</button>
        </div>
        
        <div>
<input type="text" v-model="buscarNit" placeholder="Buscar cedula">
<button @click="buscarRutaId()">Buscar</button>
<button @click="buscarRuta()">Listar Rutas</button>
        </div>

</div>
</template>

<script setup>
import {ref} from "vue"
import {useRutaStore} from "../stores/rutas.js"

let codigo=ref('')
let origen=ref('')
let destino=ref('')
let salida=ref('')
let tiempo=ref('')
let id=ref('')
const useRuta=useRutaStore()

async function registrarRuta(){
    let res= await useRuta.registrarRuta({
       codigo: codigo.value,
       origen: origen.value,
       destino: destino.value,
       salida: salida.value,
       tiempo: tiempo.value
    })
    console.log(res);
}

async function buscarRuta(){
  let buscar= await useRuta.buscarRuta()
  console.log(buscar);
}


  async function buscarRutaId() { 
    let res = await useRuta.buscarRutaId(id.value);
    return res;
  }

  async function editarRuta(){
 const res= await useRuta.editarRuta(id.value,origen.value,destino.value,salida.value,tiempo.value)
  console.log(res);
}

async function eliminarRuta(){
  const res= await useRuta.eliminarRuta(id.value)
  console.log(res);  
}
</script>