<template>
    <div class="container">
        <TopBar></TopBar>

        <h2>Asignar incidencia</h2>

        <div class="containerForm">
            <div class="classboton">
                <button class="btn btn-secondary btn-sm" @click="home">Regresar</button>
                <button class="btn btn-danger btn-sm" @click="logout">Cerrar Sesión</button>
            </div>

            <label class="subT">Seleccionar incidencia</label>
            <div class="grupo">
                <select v-model="selectedIncidentFolio" @change="updateSelectedIncident">
                    <option v-for="inc in incidents" :key="inc.Folio" :value="inc.Folio.toString()">
                        {{ inc.Folio }} - {{ inc.Descripcion }}
                    </option>
                </select>
            </div>

            <label class="subT">Datos de la incidencia</label>
            <div class="top" v-if="selectedIncident">
                <div class="grupo">
                    <label>Folio de incidencia</label>
                    <input type="text" :placeholder="selectedIncident.Folio" disabled>
                </div>
                <div class="grupo">
                    <label>Edificio</label>
                    <input type="text" :placeholder="selectedIncident.Aula" disabled>
                </div>
                <div class="grupo">
                    <label>Periodo</label>
                    <input type="text" :placeholder="selectedIncident.Periodo" disabled>
                </div>
            </div>

            <div class="grupo">
                <label>Descripción</label>
                <input class="desc" type="text" :placeholder="selectedIncident?.Descripcion" disabled>
            </div>

            <hr>

            <label class="subT">Seleccionar técnico</label>
            <div class="grupoB">
                <select v-model="selectedTechnician">
                    <option v-for="opcion in techEmployees" :key="opcion.ID_Emp" :value="opcion.ID_Emp">
                        {{ opcion.Nombre + ' ' + opcion.ApellidoPat + ' ' + opcion.ApellidoMat }}
                    </option>
                </select>

                <div class="aux">
                    <label>Prioridad</label>
                    <select v-model="selectedPriority">
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>

                <button class="btn btn-primary" @click="assignIncident">Asignar</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTechEmployees } from '../controladores/useEmployees.ts';
import { useRouter } from 'vue-router';
import { useIncidents } from '../controladores/useIncidents';
import TopBar from '../../principal/layouts/TopBar.vue';

const { incidents, getIncidents } = useIncidents();
const { techemployees: techEmployees, getTechEmployees } = useTechEmployees();
const router = useRouter();

const selectedIncidentFolio = ref<string | null>(null);
const selectedIncident = ref<any>(null);
const selectedTechnician = ref<number | null>(null);
const selectedPriority = ref<string>('Media');

onMounted(async () => {
    await getIncidents();
    await getTechEmployees();
});

const updateSelectedIncident = () => {
    selectedIncident.value = incidents.value.find(inc => inc.Folio === Number(selectedIncidentFolio.value)) || null;
};

const assignIncident = async () => {
    if (!selectedIncident.value || !selectedTechnician.value) {
        alert("Por favor selecciona una incidencia y un técnico.");
        return;
    }

    console.log("Asignando incidencia:", {
        Folio: selectedIncident.value.Folio,
        Tecnico: selectedTechnician.value,
        Prioridad: selectedPriority.value
    });

    alert("Incidencia asignada correctamente.");
};

const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' });
};

const home = () => {
    router.push({ name: 'InicioAdmin' });
};
</script>

<style scoped>
.container {
    max-width: 100%;
    width: 100%;
    height: 100vw;
    background-color: #fff;
    color: black;
    padding-right: 0;
    padding-left: 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.containerForm {
    padding: 5em;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
    padding: 1em;
}

.aux {
    display: flex;
    flex-direction: row;
    gap: 1em;
}

.subT {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0.5em;
    display: block;
}

.top {
    display: flex;
    gap: 1.5em;
    justify-content: space-between;
}

.grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.grupoB {
    display: flex;
    gap: 1em;
    align-items: center;
    margin-top: 1em;
}

.desc {
    width: 100%;
    height: 80px;
    padding: 0.5em;
}

button:hover {
    background-color: #0056b3;
}

select {
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #ced4da;
    font-size: 1em;
    width: 70%;
}

.classboton {
    display: flex;
    justify-content: space-between;
}
</style>
