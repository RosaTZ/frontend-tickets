<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

          Contransporte
        </q-toolbar-title>
        <div class="infoInicio" >
          <q-avatar size="40px" style="margin-top:3%; margin-bottom: 3%"  class="avatar">R</q-avatar>
          <div class="text-weight-bold" style="margin-top: 12%;" color="amarillo">Ros Ruiz</div>
        </div>
      </q-toolbar>
      
    </q-header>


    <q-drawer v-model="leftDrawerOpen" side="left"  overlay behavior="desktop" elevated  show-if-above :width="250" :breakpoint="600">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; ">
        <q-list padding>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-solid fa-house fa-xl"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/homeAdmin" style="text-decoration: none;color: black;">
                Home
              </router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-solid fa-person fa-2xl"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/clientes" style="text-decoration: none;color: black;">
                Clientes
              </router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-regular fa-id-card fa-xl"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/conductores" style="text-decoration: none;color: black;">
                Conductores
              </router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-regular fa-eye"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/revision" style="text-decoration: none;color: black;">
                Revision
              </router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-solid fa-route"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/rutas" style="text-decoration: none;color: black;">
                Rutas
              </router-link>
            </q-item-section>
          </q-item>
          

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-solid fa-bus fa-xl"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/vehiculos" style="text-decoration: none;color: black;">
                Vehículos
              </router-link>
            </q-item-section>
          </q-item>





          <q-item clickable v-ripple>
            <q-item-section avatar>
              <i class="fa-solid fa-ticket fa-xl"></i>
            </q-item-section>

            <q-item-section>
              <router-link to="/ticket" style="text-decoration: none;color: rgb(0, 0, 0);">
                Tiquetes
              </router-link>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top"  style="height: 150px ; background-color: #32a095b1" >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="50px" style="margin-bottom: 10px;" class="avatar">R</q-avatar>
          <div class="text-weight-bold">Ros Ruiz</div>
          <div>Administrador</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
let empresa=ref('cotrasaravita')

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      empresa,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
