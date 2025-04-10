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
                <label>Folio de incidencia</label>
                <input type="text" :placeholder="selectedIncident?.Folio" disabled>
            </div>
            <div class="grupo">
                <label>Ubicacion</label>
                <input type="text" :placeholder="selectedIncident?.Aula" disabled>
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

        bitacora.value.ID_Emp = selectedIncident.value?.ID_Emp;
        console.log('selectedIncident', selectedIncident.value);
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
    max-width: 900px;
    margin: 2em auto;
    background-color: #ffffff;
    color: #333;
    padding: 2em;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 1.8em;
    color: #007bff;
}

.subT {
    font-size: 1.2em;
    font-weight: 600;
    margin-top: 2em;
    margin-bottom: 1em;
    display: block;
    color: #444;
}

.top {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    margin-bottom: 1.5em;
}

.grupo {
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

input[type="text"],
textarea {
    padding: 0.75em;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1em;
    background-color: #f9f9f9;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
textarea:focus {
    border-color: #007bff;
    outline: none;
    background-color: #fff;
}

textarea.desc {
    resize: vertical;
    min-height: 100px;
    max-height: 200px;
    width: 100%;
}

button {
    padding: 0.75em 1.5em;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
}

button:hover {
    transform: scale(1.02);
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    margin-top: 1.5em;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #545b62;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #bd2130;
}

.classboton {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5em;
    gap: 1em;
    flex-wrap: wrap;
}

@media (max-width: 600px) {
    .top {
        flex-direction: column;
    }

    .classboton {
        flex-direction: column;
        align-items: stretch;
    }

    .btn {
        width: 100%;
    }
}
</style>
