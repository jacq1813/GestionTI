<template>
    <TopBar></TopBar>
    <div class="container">
        <h2>Solicitar cambio</h2>
        <div class="classboton">
            <button class="btn btn-secondary btn-sm" @click="home">Regresar</button>
            <button class="btn btn-danger btn-sm" @click="logout">Cerrar Sesión</button>
        </div>

        <label class="subT">Datos de la incidencia</label>
        <div class="top">
            <div class="grupo">
                <label>Folio de solicitud</label>
                <input type="text" :placeholder="selectedIncident?.Id_Bitacora" disabled>
            </div>
            <div class="grupo">
                <label>Folio de incidencia</label>
                <input type="text" :placeholder="selectedIncident?.Folio" disabled>
            </div>
            <div class="grupo">
                <label>Ubicacion</label>
                <input type="text" :placeholder="selectedIncident?.Edificio + ', ' + selectedIncident?.Aula" disabled>
            </div>
            <div class="grupo">
                <label>Descripcion de la incidencia</label>
                <input type="text" :placeholder="selectedIncident?.Descripcion" disabled>
            </div>
        </div>

        <div class="grupo">
            <label>Descripción del cambio requerido</label>
            <textarea v-model="bitacora.Descripcion" class="desc" placeholder="Descripción del cambio requerido"
                required></textarea>
        </div>

        <button class="btn btn-primary" @click="registrarCambio">Solicitar Cambio</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TopBar from '../layouts/TopBar.vue';
import { useLog } from '../controladores/useLog';
import { useIncidents } from '@/modulos/incidents/controladores/useIncidents'
const { incidents, getIncidentsByFolio } = useIncidents();

const { addLog } = useLog();

const router = useRouter();

const selectedIncident = ref<any>(null);

const bitacora = ref({
    Folio_Incidencia: 0,
    Fecha_Cambio: new Date().toISOString(),
    Descripcion: '',
    Estado: 'Pendiente',
    ID_Emp: Number(localStorage.getItem('ID_Emp'))
});

onMounted(async () => {
    const folio = router.currentRoute.value.query.folio as string;
    if (folio) {
        selectedIncident.value = await getIncidentsByFolio(folio);
        bitacora.value.Folio_Incidencia = selectedIncident.value?.Folio;
    }
});

// Función para registrar el cambio en la bitácora
const registrarCambio = async () => {
    try {
        await addLog(bitacora.value); // Llama a tu API
        alert('Cambio solicitado con éxito');
        router.push({ name: 'InicioAdmin' });
    } catch (error) {
        console.error('Error al solicitar el cambio:', error);
        alert('Hubo un error al solicitar el cambio');
    }
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

select,
input[type="text"],
textarea {
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #ced4da;
    font-size: 1em;
    width: 70%;
}

button {
    padding: 0.6em 1.2em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.classboton {
    display: flex;
    justify-content: space-between;
}
</style>
