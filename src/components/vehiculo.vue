<template>
    <div>
      <div>
        <input type="text" v-model="matricula" placeholder="cedula">
    <input type="text" v-model="num_vehiculo" placeholder="nombres">
    <input type="text" v-model="Propietario" placeholder="apellidos">
    <input type="text" v-model="tarjeta_propiedad" placeholder="Número de la tarjeta de propiedad">
    <input type="text" v-model="conductor" placeholder="Conductor">
    <input type="text" v-model="revision" placeholder="Revisión">
<button @click="registrarVehiculo()">Guardar</button>
<button @click="editarVehiculo()">Editar vehiculos</button>
      </div>
   
      <div>
<input type="text" v-model="id" placeholder="Buscar cedula">
<button @click="buscarVehiculoId()">Buscar</button>
<button @click="buscarVehiculo()">Listar conductores</button>
        </div>

</div>
</template>

<script setup>
import {ref} from "vue"
import {useVehiculoStore} from "../stores/vehiculo.js"

let matricula=ref('')
let num_vehiculo=ref('')
let Propietario=ref('')
let tarjeta_propiedad=ref('')
let conductor=ref('')
let revision=ref('')
let id=ref('')
const useVehiculo=useVehiculoStore()

async function registrarVehiculo(){
    let res= await useVehiculo.registrarVehiculo({
      matricula: matricula.value,
      num_vehiculo: num_vehiculo.value,
      Propietario: Propietario.value,
      tarjeta_propiedad: tarjeta_propiedad.value
    })
    console.log(res);
}

async function buscarVehiculo(){
  let buscar= await useVehiculo.buscarVehiculo()
  console.log(buscar);
}

async function buscarVehiculoId() { 
    let res = await useVehiculo.buscarVehiculoId(id.value);
    return res;
}
async function editarVehiculo(){
 const res= await useVehiculo.editarVehiculo(id.value,Propietario.value, num_vehiculo.value)
  console.log(res.data);
}

async function eliminarVehiculo(){
  const res= await useVehiculo.eliminarVehiculo(id.value)
  console.log(res);  
}

</script>