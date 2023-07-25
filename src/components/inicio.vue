<template>
    <div id="app">
      <router-link to="/cliente">
        <div id="cliente">
          <span>Clientes</span>
        </div>
      </router-link>
  
      <router-link to="/conductor"> 
      <div id="conductor">
        <span>Conductor</span>
      </div>
      </router-link>
  
      <router-link to="/empresa">
        <div id="empresa">
          <span>Empresa</span>
        </div>
      </router-link>
  
      <router-link to="/revision">
        <div id="revision">
          <span>Revisión</span>
        </div>
      </router-link>
  
      <router-link to="/rutas">
        <div id="rutas">
          <span>Rutas</span>
        </div>
      </router-link>
  
      <router-link to="/ticket">
        <div id="ticket">
          <span>Ticket</span>
        </div>
      </router-link>
  
      <router-link to="/vehiculo">
        <div id="vehiculo">
          <span>Vehiculo</span>
        </div>
      </router-link>
    </div>
  </template>
  <script setup>
  </script>
  <style>
  * {
    margin: 0;
    padding: 0;
  }
  #app {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    flex-grow: 5;
    text-align: center;
    align-items: center;
    margin: 25px;
  }
  #app div{
      margin: 25px;
  }
  </style>