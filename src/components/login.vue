<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col"></div>
            <div class="col">
    
                <div class="card mt-5" style="width: 33rem; height : 26rem">
                    <div class="card-body">
                    <h6 class="card-title" id="uno">cootrasaravita</h6>
                    <img src="../imagenes/autobus.png" alt="" class="card-image">
                    <div class="botones">
    
                        <button class="btn btn-warning" ><router-link to="/admin" id="admin">Administrador</router-link></button>
                        <button class="btn btn-info"  ><router-link to="/vendedor" id="admin"> Vendedor</router-link></button>
    
                    </div>
    
                    </div>
                </div>
    
            </div>
            <div class="col"></div>
        </div>
    </div>
    
        
    </template>
    <script setup>
    
    
    </script>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    .card-header {
          display: flex;
          justify-content: center;
          align-items: center;
          
          
        }
        
        .button {
          padding: 10px 20px;
          font-size: 18px;
          margin: 0 10px;
          width: 25vh;
        }
        
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
        }
    .card-image{
        display: block;
        margin: auto;
        align-content: center;
    }
    
    #uno{
        text-align: center;
        align-items: center;
        font-weight: 600;
        font-size: 30px;
        border-bottom: 2px  solid rgb(57, 207, 248);
        
    
    }
    
    #admin{
        text-decoration: none;
        color:  #3d3c3c;
    }
    
    .botones{
      display: flex;
      justify-content: center;
      margin: 5px 10px; /* Ajusta el margen horizontal según tus necesidades */
      padding: 10px 20px;
      gap: 2vh;
    
    
    }
    
    </style>