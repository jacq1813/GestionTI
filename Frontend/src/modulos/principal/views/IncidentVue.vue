<template>
    <div class="container">
        <TopBar></TopBar>
        <h2>Reportar incidencia</h2>

        <div class="classboton">
            <button class="btn btn-secondary" @click="home">Regresar</button>
            <button class="btn btn-danger" @click="logout">Cerrar Sesión</button>
        </div>

        <form class="formulario" @submit.prevent="submitForm">
            <div class="top">
                <div class="grupo">
                    <input type="text" placeholder="# Folio" disabled />
                </div>

                <!-- Edificio -->
                <div class="grupo">
                    <label>Edificio</label>
                    <select v-model="newIncident.ID_Edif">
                        <option v-for="opcion in buildings" :key="opcion.ID_Edif" :value="opcion.ID_Edif">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>

                <!-- Aula -->
                <div class="grupo">
                    <label>Aula</label>
                    <select v-model="newIncident.ID_Aula">
                        <option v-for="opcion in filteredClassrooms" :key="opcion.ID_Aul" :value="opcion.ID_Aul">
                            {{ opcion.Nombre }}
                        </option>
                    </select>

                </div>

                <!-- Dispositivo -->
                <div class="grupo">
                    <label>Dispositivos</label>
                    <select v-model="newIncident.ID_Dispositivo">
                        <option v-for="opcion in filteredDevices" :key="opcion.ID_Equip" :value="opcion.ID_Equip">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Descripción -->
            <div class="grupoD">
                <label for="tipo">Descripción</label>
                <input class="desc" type="text" placeholder="Descripción" v-model="newIncident.Descripcion" />
            </div>

            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../layouts/TopBar.vue'

import { useBuilding } from '../controladores/useBuilding'
import { useClassroom } from '../controladores/useClassroom'
import { useDevice } from '../controladores/useDevice'
import { useIncidents } from '../controladores/useIncidents'

// Hooks personalizados
const { buildings, getBuilding } = useBuilding()
const { classrooms, getClassroom } = useClassroom()
const { devices, getDevices } = useDevice()
const { addIncidents } = useIncidents()

// Rol del usuario
const rol = ref('')


const router = useRouter()

// Datos del formulario
const newIncident = ref({
    ID_Edif: 0,
    ID_Aula: 0,
    ID_Dispositivo: '',
    Descripcion: '',
    Fecha: new Date().toISOString().slice(0, 10),
    Hora: new Date().toISOString().slice(11, 19)
})

// Enviar formulario
const submitForm = async () => {
    try {
        console.log('Enviando:', newIncident.value)
        await addIncidents(newIncident.value)
        alert('Incidencia enviada con éxito')
        router.push({ name: 'Inicio' })
    } catch (error) {
        console.error('Error al enviar la incidencia:', error)
        alert('Ocurrió un error al enviar la incidencia')
    }
}

// Filtrar aulas por edificio
const filteredClassrooms = computed(() => {
    return classrooms.value.filter(aula =>
        aula.ID_Edif === newIncident.value.ID_Edif
    )
})

// Filtrar dispositivos por aula
const filteredDevices = computed(() => {
    return devices.value.filter(device =>
        device.ID_Aul === newIncident.value.ID_Aula
    )
})

// Cargar datos al montar
onMounted(async () => {
    await getBuilding()
    await getClassroom()
    await getDevices()


})

// Navegación
const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.push({ name: 'validacion' })
}

const home = () => {
    router.push({ name: 'Inicio' })
}
</script>

  
<style scoped>
.container {
    max-width: 100%;
    width: 100%;
    height: 100vw;
    background-color: rgb(255, 255, 255);
    color: black;
}

h2 {
    text-align: center;
    margin: 2em;
    color: black;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 3em 2em;
    background-color: #f9f9f9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.top {
    display: flex;
    gap: 2em;
    justify-content: first baseline;
}

.grupo {
    display: flex;
    flex-direction: row;
    gap: 1em;
    color: black;
    align-items: flex-start;
    justify-content: space-between;
}

.desc {
    width: 100%;
    height: 100px;
}

.classboton {
    margin-bottom: -20px;
    display: flex;
    padding: 0 2em;
    justify-content: space-between;
}
</style>
  