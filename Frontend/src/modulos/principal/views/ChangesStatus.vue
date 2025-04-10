<template>
    <TopBar></TopBar>
    <div class="container">

        <h2> Actualizar cambio en bitacora </h2>
        <div class="classboton">
            <button class="btn btn-secondary btn-sm" @click="home">Regresar</button>
            <button class="btn btn-danger btn-sm" @click="logout">Cerrar Sesión</button>
        </div>
        <label class="subT">Datos de la incidencia</label>
        <div class="top">
            <div class="grupo">
                <label>Folio de solicitud</label>
                <!-- aqui se debera cambiar a selectedBitacora ya que tenga la API-->
                <input type="text" :placeholder="selectedBitacora?.ID_Bitacora" disabled>
            </div>
            <div class="grupo">
                <label>Folio de incidencia</label>
                <input type="text" :placeholder="selectedBitacora?.Folio_Incidencia" disabled>
            </div>
            <div class="grupo">
                <label>Ubicacion</label>
                <input type="text" :placeholder="selectedBitacora?.Edificio + ', ' + selectedBitacora?.Aula" disabled>
            </div>
            <div class="grupo">
                <label>Descripcion de la incidencia</label>
                <input type="text" :placeholder="selectedBitacora?.Descripcion_Bitacora" disabled>
            </div>

        </div>

        <div class="grupo">

            <label>Estado del cambio</label>
            <select v-model="updEstadoInc.Estado">
                <option value="Aceptado">Aceptado</option>
                <option value="Rechazado">Rechazado</option>
            </select>
        </div>

        <!-- boton de solicitar cambio -->
        <button class="btn btn-primary" @click="actualizarEstado">Solicitar Cambio</button>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import TopBar from '../layouts/TopBar.vue';
import { useLog } from '../controladores/useLog';

const { logsD, getLogById } = useLog();
const { updateLog } = useLog();

const router = useRouter();

const selectedBitacora = ref<any>(null);

const updEstadoInc = ref({
    Estado: '',
});
const folio = Number(router.currentRoute.value.query.folio);
onMounted(async () => {
    // Asumimos que el folio se pasa como parámetro de la URL
    if (folio) {
        selectedBitacora.value = await getLogById(folio);
        console.log(folio);
        console.log(selectedBitacora.value);
    } else {
        console.error('No se proporcionó un folio válido');
    }
});

const actualizarEstado = async () => {
    try {
        if (!folio) {
            alert('No se encontró el ID de la bitácora');
            return;
        }

        const nuevoEstado = updEstadoInc.value.Estado;
        console.log('Nuevo estado:', nuevoEstado);
        console.log('Folio:', folio);
        const respuesta = await updateLog(folio, nuevoEstado);

        if (respuesta) {
            alert('Estado actualizado correctamente');
            router.push({ name: 'InicioAdmin' });
        } else {
            alert('Error al actualizar el estado');
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        alert('Ocurrió un error al actualizar el estado');
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
