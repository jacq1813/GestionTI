<template>
    <div class="container">

        <TopBar></TopBar>

        <h2>Actualizar Incidencia</h2>

        <div class="classboton">
            <button class="btn btn-secondary" @click="home">Regresar</button>
            <button class="btn btn-danger" @click="logout">Cerrar Sesión</button>
        </div>

        <form class="formulario">
            <!-- Incidencia Seleccionada -->

            <label class="subT">Datos de la incidencia</label>
            <div class="top">
                <div class="grupo">
                    <label>Folio de incidencia</label>
                    <input type="text" :placeholder="selectedIncident?.Folio" disabled>
                </div>
                <div class="grupo">
                    <label>Ubicación</label>
                    <input type="text" :placeholder="selectedIncident?.Aula" disabled>
                </div>
                <div class="grupo">
                    <label>Periodo</label>
                    <input type="text" :placeholder="selectedIncident?.Periodo" disabled>
                </div>
            </div>

            <div class="grupo">
                <label>Descripción</label>
                <input class="desc" type="text" :placeholder="selectedIncident?.Descripcion" disabled>
            </div>

            <hr>

            <div class="bottom">
                <div class="grupo">
                    <label>Estado</label>
                    <select v-model="updatedState">
                        <option value="Pendiente">En proceso</option>
                        <option value="En Proceso">Aceptada</option>
                        <option value="Resuelto">Liberada</option>
                        <option value="Rechazado">Rechazada</option>
                    </select>
                </div>

                <button type="button" class="btn btn-primary" @click="updateIncident">Actualizar</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// Simulación de la API de incidencias
import { useIncidents } from '../controladores/useIncidents';
import TopBar from '../../principal/layouts/TopBar.vue';

const { incidents, getIncidentsByFolio } = useIncidents();
const { updateEstadoIncident } = useIncidents(); // Asegúrate de tener esta función en tu controlador

const updatedState = ref<string>('');
const updatedPriority = ref<string>('');
const router = useRouter();

const selectedIncident = ref<any>(null);

const updEstadoInc = ref({
    Estado: '',
});

onMounted(async () => {
    const folio = router.currentRoute.value.query.folio as string;  // Asumimos que el folio se pasa como parámetro de la URL
    if (folio) {

        selectedIncident.value = await getIncidentsByFolio(folio);
        console.log(selectedIncident.value);

        updatedState.value = selectedIncident.value.Estado;  // Llenamos el estado actual de la incidencia
    }
});

// Función para actualizar la incidencia



// Cargar la incidencia al montar el componente
onMounted(async () => {
    const folio = router.currentRoute.value.query.folio as string;  // Asumimos que el folio se pasa como parámetro de la URL
    if (folio) {
        selectedIncident.value = await getIncidentsByFolio(folio);
        updatedState.value = selectedIncident.value.Estado;  // Llenamos el estado actual de la incidencia
        updatedPriority.value = selectedIncident.value.Prioridad;  // Si es necesario
    }
});

// Función para actualizar la incidencia
const updateIncident = async () => {
    try {

        const estado = updatedState.value;
        await updateEstadoIncident(selectedIncident.value.Folio, estado);
        alert('Incidencia actualizada con éxito');

    } catch (error) {
        console.error('Error al actualizar la incidencia:', error);
        alert('Ocurrió un error al actualizar la incidencia');
    }
};

// Funciones de navegación
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
    padding-right: 0;
    padding-left: 0;

    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
    padding: 1em;
    color: black;
}

.top {
    display: flex;
    gap: 1.5em;
    justify-content: space-between;
}

.bottom {
    display: flex;
    gap: 2em;
    justify-content: space-between;
    align-items: center;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 2em 3em;
    background-color: #F9F9F9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.desc {
    width: 100%;
    height: 80px;
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    color: black;
    width: 100%;
}

.classboton {
    margin-bottom: 1em;
    margin: 0em 3em;
    display: flex;
    justify-content: space-between;
}

select {
    width: 100%;
    padding: 0.8em;
    border-radius: 5px;
    border: 1px solid #DDD;
    background-color: #f8f9fa;
    font-size: 1em;
}



button:hover {
    background-color: #0056b3;
}

button:focus {
    outline: none;
}

button:active {
    background-color: #003f8d;
}
</style>
