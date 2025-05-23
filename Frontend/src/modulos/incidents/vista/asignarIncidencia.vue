<template>
    <TopBar></TopBar>
    <div class="container">
        <h2>Asignar incidencia</h2>
        <div class="classboton">
            <button class="btn btn-secondary btn-sm" @click="home">Regresar</button>
            <button class="btn btn-danger btn-sm" @click="logout">Cerrar Sesión</button>
        </div>
        <label class="subT">Datos de la incidencia</label>
        <div class="top">
            <div class="grupo">
                <label>Folio de incidencia</label>
                <input type="text" :placeholder="selectedIncident?.Folio" disabled>
            </div>
            <div class="grupo">
                <label>Edificio</label>
                <input type="text" :placeholder="selectedIncident?.Aula" disabled>
            </div>
            <div class="grupo">
                <label>Periodo</label>
                <input type="text" :placeholder="selectedIncident?.Periodo" disabled>
            </div>
            <div class="grupo">
                <label>Dispositivo</label>
                <input type="text" :placeholder="selectedIncident?.TipoEquipo" disabled>
            </div>
        </div>

        <div class="grupo">
            <label>Descripción</label>
            <input class="desc" type="text" :placeholder="selectedIncident?.Descripcion" disabled>
        </div>

        <hr>

        <label class="subT">Seleccionar técnico</label>
        <div class="grupoB">
            <select v-model="updIncident.ID_Tec">
                <option v-for="opcion in techEmployees" :key="opcion.ID_Emp" :value="opcion.ID_Emp">
                    {{ opcion.Nombre + ' ' + opcion.ApellidoPat + ' ' + opcion.ApellidoMat }}
                </option>
            </select>

            <div class="aux">

                <label>Prioridad</label>
                <select>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                </select>
            </div>

            <button class="btn btn-primary" @click="assignIncident">Asignar</button>
        </div>


    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTechEmployees } from '../controladores/useEmployees.ts';
import TopBar from '../../principal/layouts/TopBar.vue';
import { useRouter } from 'vue-router'
import { useIncidents } from '../controladores/useIncidents';

const { incidents, getIncidentsByFolio } = useIncidents();

const { techemployees: techEmployees, getTechEmployees } = useTechEmployees();
const router = useRouter()
const selectedIncident = ref<any>(null);
const { updateIncident } = useIncidents();


onMounted(async () => {

    const folio = router.currentRoute.value.query.folio as string;  // Asumimos que el folio se pasa como parámetro de la URL
    if (folio) {

        selectedIncident.value = await getIncidentsByFolio(folio);
        console.log('selectedIncident', selectedIncident.value);
        console.log(selectedIncident.value);
    }
    await getTechEmployees();
});

const updIncident = ref({
    ID_Tec: '',
    Prioridad: ''
})
// Asignar la incidencia con los datos actualizados
const assignIncident = async () => {
    try {
        const Prioridad = (document.querySelectorAll('select')[1] as HTMLSelectElement).value;
        const ID_Tec = (document.querySelector('select') as HTMLSelectElement).value;

        console.log(updIncident.value);
        await updateIncident(selectedIncident.value.Folio, Prioridad, Number(ID_Tec));
        alert('Incidencia asignada con éxito');
        router.push({ name: 'InicioAdmin' });
    } catch (error) {
        console.error('Error al asignar la incidencia:', error);
    }
};

//cerrar sesion
const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' })
}

const home = () => {
    router.push({ name: 'InicioAdmin' })
}
</script>

<style scoped>
.container {
    max-width: 80%;
    width: 80%;
    height: auto;
    background-color: #fff;
    color: black;
    padding: 2em;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2em;
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
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

/* button {
    padding: 0.6em 1.2em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.3s;
} */

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