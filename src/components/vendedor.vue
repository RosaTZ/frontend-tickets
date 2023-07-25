<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card login-container">
            <div class="card-body">
              <div class="profile-image">
                <img src="../imagenes/agente.png" alt="Imagen de perfil">
              </div>
              <h3 class="text-center mb-2">Iniciar sesión vendedor</h3>
              <form>
                <div class="mb-3">
                  <label for="username" class="form-label ">Usuario</label>
                  <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-info">Iniciar sesión</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script setup>
  import {ref} from "vue"
  // import {useVendedorStore} from "../stores/vendedor.js"
  
  // const useVendedor=useVendedorStore()
  
  </script>
  
  
    <style>
      .login-container {
        max-width: 400px;
        margin: 0 auto;
        margin-top: 100px;
      }
  
      .profile-image {
        display: flex;
        justify-content: center;
        margin-top: -50px;
      }
  
      .profile-image img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
      }
    </style>