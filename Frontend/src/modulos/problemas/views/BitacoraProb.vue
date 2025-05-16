<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Bitacora de problemas</h2>

            <div class="btn-group">
                <button class="btn btn-regresar" @click="home" title="Volver al inicio">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
                <button class="btn btn-anadir" @click="anadir" v-if="rol === 'admin'" title="Añadir nuevo edificio">
                    <i class="fa fa-plus"></i> Añadir
                </button>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>Folio del problema</th>
                        <th>Folio de incidencia</th>
                        <th>Descripcion de incidencia</th>
                        <th>Tec. de diagnostico</th>
                        <th>Causa del problema</th>
                        <th>Solución</th>
                        <th>Estado</th>
                        <th>Prioridad</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="navigateToStatus()" title="Actualizar estado"
                                v-if="rol === 'Jefe de taller'"><i class="fa fa-pencil"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
//import TopBar from '../layouts/TopBar.vue'
import { onMounted, ref, computed } from 'vue'
//import { useLog } from '../controladores/useLog'
import TopBar from '../../principal/layouts/TopBar.vue';

import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'


const rol = ref('')
//const { logsD, getLogDetails } = useLog()

const router = useRouter();

const navigateToStatus = (folio: number) => {
    // Navegar a la ruta 'ActualizarIncidente' y pasar el 'folio' como parámetro de ruta
    router.push({ name: 'CambiosStatus', query: { folio } });
};

onMounted(async () => {
    // await getLogDetails();
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
        const db = getFirestore()
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid))
        if (userDoc.exists()) {
            const userData = userDoc.data()
            rol.value = userData.Rol
        }
    }
})

const home = () => {
    if (rol.value === 'admin' || rol.value === 'Tecnico' || rol.value === 'Jefe de taller') {
        router.push({ name: 'InicioAdmin' })
    } else {
        router.push({ name: 'Inicio' })
    }
}

const anadir = () => {
    router.push({ name: 'InsertaEdificio' })
}
</script>

<style scoped>
.Container {
    background-color: #f4f6fa;
    min-height: 100vh;
}

.Cont {
    max-width: 100hv;
    margin: 2em 3em;
    padding: 2em;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    align-self: center;
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 1.8em;
    color: #4a4a4a;
    border-bottom: 2px solid #daadff;
    padding-bottom: 0.5em;
}

.btn-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5em;
    flex-wrap: wrap;

}

.btn {
    padding: 0.6em 1.2em;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.95em;
    display: flex;
    align-items: center;
    gap: 0.5em;
    transition: background-color 0.3s ease;
}

.btn i {
    font-size: 1em;
}

.btn-regresar {
    background-color: #6c757d;
    color: white;
}

.btn-regresar:hover {
    background-color: #5a6268;
}

.btn-anadir {
    background-color: #6f42c1;
    color: white;
}

.btn-anadir:hover {
    background-color: #5a32a3;
}

.table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95em;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

th,
td {
    padding: 14px 18px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #daadff;
    color: white;
    font-weight: 600;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #eef0f4;
}
</style>
