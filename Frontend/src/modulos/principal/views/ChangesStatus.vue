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
                <!-- aqui se debera cambiar a selectedBitacora ya que tenga la API-->
                <input type="text" :placeholder="selectedIncident?.Id_Bitacora" disabled>
            </div>
            <div class="grupo">
                <label>Folio de incidencia</label>
                <input type="text" :placeholder="selectedIncident?.Folio" disabled>
            </div>
            <div class="grupo">
                <label>Ubicacion</label>
                <input type="text" :placeholder="selectedIncident?.Edificio + '' + selectedIncident?.Aula" disabled>
            </div>
            <div class="grupo">
                <label>Descripcion de la incidencia</label>
                <input type="text" :placeholder="selectedIncident?.Descripcion" disabled>
            </div>

        </div>

        <!-- Aqui se pone un vmodel-->
        <div class="grupo">
            <label>Descripción del cambio requerido</label>
            <textarea v-model="bitacora.Descripcion" class="desc" placeholder="Descripción del cambio realizado"
                required></textarea>
        </div>

        <!-- boton de solicitar cambio -->
        <button class="btn btn-primary" @click="home">Solicitar Cambio</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import TopBar from '../layouts/TopBar.vue'
import { useIncidents } from '@/modulos/incidents/controladores/useIncidents';


const { incidents, getIncidentsByFolio } = useIncidents();

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



const bitacora = ref({
    Folio_Incidencia: '',
    Estado_anterior: '',
    Estado_nuevo: '',
    Descripcion: '',
    Accion: '',
    Usuario: ''
});

// Función para registrar el cambio en la bitácora
const registrarCambio = async () => {
    try {
        const data = {
            Folio_Incidencia: bitacora.value.Folio_Incidencia,
            Estado_anterior: bitacora.value.Estado_anterior,
            Estado_nuevo: bitacora.value.Estado_nuevo,
            Descripcion: bitacora.value.Descripcion,
            Accion: bitacora.value.Accion,
            Usuario: bitacora.value.Usuario
        };

        // Aquí iría la lógica para enviar los datos al backend
        // Por ejemplo, puedes usar una API que reciba los datos y registre el cambio en la bitácora

        console.log("Cambio registrado:", data);
        alert('Cambio registrado con éxito');
        router.push({ name: 'InicioAdmin' });
    } catch (error) {
        console.error('Error al registrar el cambio:', error);
        alert('Error al registrar el cambio');
    }
};

// Función para cerrar sesión
const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' });
};

// Función para regresar al inicio
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
