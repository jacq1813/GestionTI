<template>
    <div class="container">
        <TopBar></TopBar>
        <h2>Reportar incidencia</h2>

        <div class="classboton">
            <button class="btn btn-secondary" @click="home">Regresar</button>
            <button class="btn btn-danger" @click="logout">Cerrar Sesión</button>
        </div>

        <form class="formulario">
            <div class="top">
                <div class="grupo">
                    <input type="text" placeholder="# Folio" disabled="true">
                </div>

                <!-- Selección de Edificio -->
                <div class="grupo">
                    <label>Edificio</label>
                    <select v-model="selectedBuilding">
                        <option v-for="opcion in buildings" :key="opcion.ID_Edif" :value="opcion.ID_Edif">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>

                <!-- Selección de Aula -->
                <div class="grupo">
                    <label>Aula</label>
                    <select v-model="selectedClassroom">
                        <option v-for="opcion in filteredClassrooms" :key="opcion.ID_Aula" :value="opcion.ID_Aula">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>

                <!-- Selección de Dispositivos -->
                <div class="grupo">
                    <label>Dispositivos</label>
                    <select>
                        <option v-for="opcion in filteredDevices" :key="opcion.ID_Dispositivo"
                            :value="opcion.ID_Dispositivo">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="grupoD">
                <label for="tipo">Descripción</label>
                <input class="desc" type="text" placeholder="Descripción">
            </div>

            <button type="button" class="btn btn-primary">Enviar</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useClassroom } from '../controladores/useClassroom';
import { useBuilding } from '../controladores/useBuilding';
import { useDevice } from '../controladores/useDevice';
import { useRouter } from 'vue-router';
import TopBar from '../layouts/TopBar.vue'
const { buildings, getBuilding } = useBuilding();
const { classrooms, getClassroom } = useClassroom();
const { devices, getDevices } = useDevice();

const router = useRouter();

// Variables reactivas
const selectedBuilding = ref<number | null>(null);
const selectedClassroom = ref<number | null>(null);

// Filtrar aulas basadas en el edificio seleccionado
const filteredClassrooms = computed(() => {
    return classrooms.value.filter(aula => aula.ID_Edif === selectedBuilding.value);
});

// Filtrar dispositivos basados en el aula seleccionada
const filteredDevices = computed(() => {
    return devices.value.filter(device => device.ID_Aula === selectedClassroom.value);
});

// Cargar datos
onMounted(async () => {
    await getBuilding();
    await getClassroom();
    await getDevices();

    // Verificar que los datos se cargaron correctamente
    console.log("Edificios:", buildings.value);
    console.log("Aulas:", classrooms.value);
    console.log("Dispositivos:", devices.value);
});

// Funciones para navegación
const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' });
};

const home = () => {
    router.push({ name: 'Inicio' });
};
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
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 3em 2em;
    background-color: #F9F9F9;
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

/* button {
    /* width: 100%;
    padding: .5em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.3s; 
}  */
</style>