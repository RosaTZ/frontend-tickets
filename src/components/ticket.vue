<template>
  <div class="q-pa-md mt-2">
      <div class="row">
          <div class="col-1">
            <q-btn  id="nuevo" label="Iniciar venta" @click="modalRegistrar=true" />

          </div>
          <div class="col-6">
              <div class="modal-bg" id="modal" v-if="modalRegistrar===true" >
      <div class="modal-content">
          <div class="modal-header">
              <h2>Seleccionar informacion </h2>
              <div v-if="alertaError===true">
                {{ alerta }}
              </div>
          </div>
          <div class="modal-body">
            <span>selecciona el bus</span>
            <select v-model="selectedBus">
                <option v-for="option in vehiculos" :value="option" :key="option">
                {{ option.matricula }} {{ option.propietario }}
               </option>
              </select>
              <span>selecciona la ruta</span>
              <select v-model="selectedRuta">
                <option v-for="option in rutas" :value="option" :key="option">
                {{option.codigo + option.origen }} {{ option.destino }} {{ option.salida }}
                <!-- <h1>{{ option }}</h1> -->
               </option>
              </select>
              <div v-if="alerta===true"  style="background-color: red; color: white;">
                {{ alert }}
              </div>
          </div>
          <div class="modal-buttons">
              <button id="closeModalBtn" @click="modalRegistrar=false">Cerrar</button>
              <button id="saveBtn" @click="infoBus()">Guardar</button>
          </div>

      </div>
  </div>

  <!-- card del bus -->
              <q-card v-if="bus===true" 
                class="my-card text-white"
                style="background:  white" id="cardTicket">  <q-card-section>
                  <div class="text-h6" style="color:rgb(0, 0, 0)">Buseta</div>
                  <div class="text-subtitle2" style="color:  rgb(0, 0, 0)">by John Doe</div>
                </q-card-section>
          
                <q-card-section class="q-pt-none q-gutter-md q-col-gutter-md" style="display: grid; grid-template-columns: repeat(2, 1fr);">
                  <img src="../imagenes/sila.png" alt="" v-for=" i in selectedBus.puestos" :key="i" id="imagen" @click="ventaTicket(i)">
                </q-card-section>
              </q-card>

              <!-- informacion ticket -->
          </div>
          <div class="col-1"></div>
          <div class="col-2">

            <div class="formulario " v-if="bus===true">
              <div class="row">
                <div class="col">
                  <p class="resaltado">Asiento # {{ numero }}</p>
                </div>
                <div class="col">
                  <button>agregar</button>
                </div>
              </div>
              
                 <span>Cédula del pasajero <button @click="buscarClienteCedula()">buscar</button></span>
                 <input type="text" v-model="cc">
             
                 <span>Nombre</span>
                 <input type="text" v-model="name" disabled>
             
                 <span>Teléfono</span>
                 <input type="text" v-model="tel" disabled>
             
                 <div class="botones">
                   <button @click="continuar()" id="ok" >continue</button>
                   <button @click="cancelarVenta" id="no">Cancelar Venta</button>
                 </div>
               </div>
            </div>
          </div>
      </div>

</template>

<script setup>
import {ref} from 'vue'
import {useVehiculoStore} from "../stores/vehiculo.js"
import {useRutaStore} from "../stores/rutas.js"
import { useClienteStore } from "../stores/cliente.js";
const useCliente = useClienteStore();
const useRuta=useRutaStore()
const useVehiculo=useVehiculoStore()
let vehiculos =ref()
let bus = ref(false)
let modalRegistrar=ref(false)
let rutas =ref()
let selectedBus =ref()
let selectedRuta=ref()
let alerta =ref(false)
let alert=ref('')
let numero =ref()
let name =ref('')
let tel=ref('')
let cc =ref('')
let clientes=ref([])
let ventas = ref([

])



function validarCampos() {
console.log("<3");
if (!selectedBus.value) {
  alerta.value = true;
  alert.value = 'Selecciona el bus';
  setTimeout(() => {
    alerta.value = false;
    alert.value = '';
  }, 3000);
  return false;
} else if (!selectedRuta.value) {
  alerta.value = true;
  alert.value = 'Selecciona la ruta';
  setTimeout(() => {
    alerta.value = false;
    alert.value = '';
  }, 3000);
  return false;
} else {
  modalRegistrar.value=false
  return true;
}

}
function limpiar() {
selectedBus.value=''
selectedRuta.value=''
}



async function buscarClienteCedula() {
    const cedulaCliente = cc.value; 
    let res = await useCliente.buscarClienteCedula(cedulaCliente);
    console.log('ooooooooooooooooo');
    console.log(res.cliente);
    if (res.length===0) {
      console.log("errror");
    }else{
      for (let i = 0; i < res.cliente.length; i++) {
        console.log(res.cliente[i].nombre);
    name.value = res.cliente[i].nombre
    tel.value =res.cliente[i].telefono      
  }
    }
  }


async function buscarVehiculo(){
vehiculos.value= await useVehiculo.buscarVehiculo()
console.log(vehiculos.value);
}
buscarVehiculo()

async function buscarRuta(){
 rutas.value= await useRuta.buscarRuta()
 console.log(rutas.value);
}
buscarRuta()


function  infoBus() {
console.log("entro aca");
if (validarCampos()===true) {
  bus.value=true
  console.log(selectedBus.value);
  console.log(selectedRuta.value);
}
}

function ventaTicket(i) {
numero.value = i
}

function continuar(params) {

}



</script>