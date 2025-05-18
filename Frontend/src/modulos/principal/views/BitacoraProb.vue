<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Bitácora de problemas</h2>

            <div class="btn-group">
                <button class="btn btn-regresar" @click="home" title="Volver al inicio">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
                <button class="btn btn-anadir" @click="anadir" v-if="rol === 'admin'" title="Añadir nuevo problema">
                    <i class="fa fa-plus"></i> Añadir
                </button>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>Folio del problema</th>
                        <th>Folio de incidencia</th>
                        <th>Descripción de incidencia</th>
                        <th>Técnico de diagnóstico</th>
                        <th>Causa del problema</th>
                        <th>Solución</th>
                        <th>Estado</th>
                        <th>Prioridad</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="problema in problemasDetalles" :key="problema.ID_Problema">
                        <td>{{ problema.ID_Problema }}</td>
                        <td>{{ problema.Folio }}</td>
                        <td>{{ problema['Descripcion de Incidencia'] }}</td>
                        <td>{{ problema['Tecnico Diagnostico'] }}</td>
                        <td>{{ problema['Causa del problema'] }}</td>
                        <td>{{ problema['Solucion del problema'] }}</td>
                        <td>{{ problema.Estado }}</td>
                        <td>{{ problema.Prioridad }}</td>
                        <th class="hola">
                            <button class="btn btn-primary btn-sm" @click="navigateToStatus(problema.ID_Problema)"
                                title="Actualizar estado" v-if="rol === 'Tecnico'">
                                <i class="fa fa-pencil"></i>
                            </button>
                        </th>
                        <th class="hola">
                            <button class="btn btn-primary btn-sm" @click="navigateToStatus(problema.ID_Problema)"
                                title="Actualizar estado" v-if="rol === 'Tecnico'">
                                Solucion
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TopBar from '../../principal/layouts/TopBar.vue';
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useProblemas } from '../controladores/useProblemas'

const { problemasDetalles, getProblemasDetalles } = useProblemas()
const rol = ref('')

const router = useRouter();


const navigateToStatus = (folio: number) => {
    console.log("folio", folio)
    router.push({ name: 'BitacoraCausa', query: { id: folio.toString() } });
};

onMounted(async () => {
    await getProblemasDetalles();
    console.log(problemasDetalles.value)

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
    router.push({ name: 'AgregarProblema' }) // Asegúrate de tener esta ruta configurada
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

th,
button {
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

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0069d9;
}

.btn-sm {
    padding: 0.25em 0.5em;
    font-size: 0.875em;
}

.hola {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    padding: 0.5em;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
</style>