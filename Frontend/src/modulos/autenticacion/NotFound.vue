<template>
    <div class="forbidden-container">
      <div class="forbidden-content">
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
        <router-link to="/validacion" class="back-button">Volver al inicio</router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No se requiere código adicional
  </script>
  
  <style scoped>
  .forbidden-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
  
  .forbidden-content {
    text-align: center;
    padding: 2rem;
    border: 1px solid #DDD;
    border-radius: 5px;
    background-color: #F9F9F9;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    max-width: 500px;
    color: black;
  }
  
  h1 {
    color: #7a0796;
  }
  
  .back-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #7a0796;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .back-button:hover {
    background-color: #5c0570;
  }
  </style>