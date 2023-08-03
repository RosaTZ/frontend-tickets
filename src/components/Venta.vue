<template>
  <div class="q-pa-md mt-2">
      <div class="row">
          <div class="col-3">
              <button @click="modalRegistrar=true">abir</button>
          </div>


          <div class="col-6">
              <div class="modal-bg" id="modal" v-if="modalRegistrar===true">
      <div class="modal-content">
          <div class="modal-header">
              <h2>Seleccionar informacion </h2>
              <div v-if="alertaError===true">
                {{ alerta }}
              </div>
          </div>
          <div class="modal-body">
          <div class="q-pa-md" style="max-width: 300px">
               <div class="q-gutter-md">
                  <span>Selecciona el bus</span>
              <q-select v-model="bus" :options="options" label="Standard" />
          </div>
         </div>
              <input type="text" v-model="bus" placeholder="" />
              <span>Fecha de la revision</span>
              <input type="date" v-model="fecha_revision" placeholder="Fecha revisión" />
              <span>Fecha proxima revision</span>
              <input type="date" v-model="fecha_proxima_revision" placeholder="Fecha de la siguiente revisión" />
              <span>Descripcion</span>
              <input type="text" v-model="descripcion" placeholder=""/>
          </div>
          <div class="modal-buttons">
              <button id="closeModalBtn" @click="modalRegistrar=false">Cerrar</button>
              <button id="saveBtn" @click="registrarRevision()">Guardar</button>
          </div>
      </div>
  </div>

              <q-card
                class="my-card text-white"
                style="background:  white">
                <q-card-section>
                  <div class="text-h6" style="color:rgb(0, 0, 0)">Buseta</div>
                  <div class="text-subtitle2" style="color:  rgb(0, 0, 0)">by John Doe</div>
                </q-card-section>
          
                <q-card-section class="q-pt-none q-gutter-md q-col-gutter-md" style="display: grid; grid-template-columns: repeat(2, 1fr);">
                  <img src="../imagenes/sila.png" alt="" v-for=" i in puestos" :key="i" id="imagen">
                </q-card-section>
              </q-card>
          </div>
          <div class="col-4"></div>
      </div>

  </div>
</template>

<script setup>
import {ref} from 'vue'
let options =ref(
"javier", "pablo","juan davis"
)


let puestos = 3
</script>