<template>
    <div class="container">
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
                    <input type="text" placeholder="# Folio" disabled>
                </div>
                <div class="grupo">
                    <label>Edificio</label>
                    <input type="text" placeholder="Edificio" disabled>
                </div>
                <div class="grupo">
                    <label>Aula</label>
                    <input type="text" placeholder="Aula" disabled>
                </div>
            </div>

            <div class="grupo">
                <label>Descripción</label>
                <input class="desc" type="text" placeholder="Descripción" disabled>
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

const { incidents, getIncidents } = useIncidents();

const selectedIncident = ref<number | null>(null);
const updatedState = ref<string>('');
const updatedPriority = ref<string>('');
const router = useRouter();

// Cargar incidencias al montar el componente
onMounted(async () => {
    await getIncidents();
});

// Función para actualizar la incidencia
const updateIncident = async () => {
    if (!selectedIncident.value) {
        alert("Seleccione una incidencia.");
        return;
    }

    const updatedData = {
        Estado: updatedState.value,
        Prioridad: updatedPriority.value,
    };

    //await updateIncidentStatus(selectedIncident.value, updatedData);
    alert("Incidencia actualizada correctamente.");
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
    max-width: 80%;
    width: 80%;
    background-color: rgb(255, 255, 255);
    color: black;
    padding: 2em;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
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
    margin: 2em auto;
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
