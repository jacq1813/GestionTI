<template>
  <div class="container">
    <TopBar></TopBar>

    <div class="content">
      <h2>Registrar Nuevo Aula</h2>

      <div class="boton">
        <button class="btn btn-secondary" @click="goBack">Regresar</button>
      </div>

      <form>
        <div class="form-group">
          <label for="nombre">Nombre del Aula:</label>
          <input type="text" v-model="newAula.Nombre" id="nombre" required class="form-control">
        </div>

        <div class="form-group">
          <label for="tipoAula">Tipo de Aula:</label>
          <select v-model="newAula.ID_TipoAula" id="tipoAula" required class="form-control">
          </select>
        </div>

        <div class="form-group">
          <label for="edificio">Edificio:</label>
          <select v-model="newAula.ID_Edif" id="edificio" required class="form-control">
            <option v-for="edificio in buildings" :key="edificio.ID_Edif" :value="edificio.ID_Edif">{{ edificio.Nombre }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="empleado">Empleado Responsable:</label>
          <select v-model="newAula.ID_Emp" id="empleado" required class="form-control">
            <option v-for="empleado in employees" :key="empleado.ID_Emp" :value="empleado.ID_Emp">{{ empleado.Nombre }} {{
              empleado.ApellidoPat }} {{ empleado.ApellidoMat }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">Registrar Aula</button>
      </form>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import TopBar from '../layouts/TopBar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
//import { useAula } from '../controladores/useAula'
import { useEmployees } from '../controladores/useEmployee'
import { useBuilding } from '../controladores/useBuilding';

// NECESITO API PARA TIPO AULA
// import { useTipoAula } from '../controladores/useTipoAula'

const router = useRouter()

const { employees, getEmployees } = useEmployees()
const { buildings, getBuilding } = useBuilding();

const newAula = ref({
  Nombre: '',
  ID_TipoAula: '',
  ID_Edif: '',
  ID_Emp: ''
})

onMounted(async () => {
  await getEmployees()
  await getBuilding()
})



const goBack = () => {
  router.push({ name: 'Inicio' })
}
</script>
  
<style scoped>
.container {
  max-width: 100%;
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  color: black;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 2em;
  border: 1px solid #DDD;
  border-radius: 5px;
  margin: 2em 3em;
  background-color: #F9F9F9;
}

h2 {
  text-align: center;
  padding: 1em;
  color: #333;
}

.form-group {
  margin-bottom: 1em;
}

label {
  font-size: 16px;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 0.5em;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin-top: 1em;
}
</style>
  