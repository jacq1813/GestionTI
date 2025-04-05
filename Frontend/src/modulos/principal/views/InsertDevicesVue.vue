<template>
    <div class="container">
        <TopBar></TopBar>

        <div class="content">
            <h2>Registrar Nuevo Equipo</h2>

            <div class="boton">
                <button class="btn btn-secondary" @click="goBack">Regresar</button>
            </div>

            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="nombre">Nombre del Equipo:</label>
                    <input type="text" v-model="newEquipo.Nombre" id="nombre" required class="form-control">
                </div>

                <div class="form-group">
                    <label for="version">Versión:</label>
                    <input type="text" v-model="newEquipo.Version" id="version" required class="form-control">
                </div>

                <div class="form-group">
                    <label for="fechaInst">Fecha de Instalación:</label>
                    <input type="date" v-model="newEquipo.Fecha_Inst" id="fechaInst" required class="form-control">
                </div>

                <div class="form-group">
                    <label for="aula">Aula:</label>
                    <select v-model="newEquipo.ID_Aul" id="aula" required class="form-control">
                        <option v-for="aula in classrooms" :key="aula.ID_Aul" :value="aula.ID_Aul">{{ aula.Nombre }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="tipoEquipo">Tipo de Equipo:</label>
                    <select v-model="newEquipo.ID_TipEquipo" id="tipoEquipo" required class="form-control">
                        <option v-for="tipoEquipo in devicesT" :key="tipoEquipo.ID_TipEquipo"
                            :value="tipoEquipo.ID_TipEquipo">
                            {{ tipoEquipo.Nombre }}
                        </option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Registrar Equipo</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import TopBar from '../layouts/TopBar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDevice } from '../controladores/useDevice'
import { useClassroom } from '../controladores/useClassroom'
import { useDeviceT } from '../controladores/useDeviceT'
//import { useTiposEquipo } from '../controladores/useTiposEquipo'

const router = useRouter()

//const { addEquipo } = useEquipo()
const { devicesT, addDeviceT, getDeviceT } = useDeviceT()
const { devices, getDevices, addDevice } = useDevice()
const { classrooms, getClassroomsDetail } = useClassroom();

// HAZ API PARA VER LOS TIPOS DE EQUIPOS
// const { getTiposEquipo, tiposEquipo } = useTiposEquipo()

const newEquipo = ref({
    Nombre: '',
    Version: '',
    Fecha_Inst: '',
    ID_Aul: '',
    ID_TipEquipo: ''
})

onMounted(async () => {
    await getClassroomsDetail();
    await getDeviceT();
})

const submitForm = async () => {
    console.log(newEquipo.value)
    await addDevice(newEquipo.value)
    await router.push({ name: 'Dispositivos' })
}

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
  