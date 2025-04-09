<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Aulas</h2>

            <div class="btn-group">
                <button class="btn btn-secondary btn-sm" @click="home" title="Volver al inicio">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
                <button class="btn btn-secondary btn-sm" @click="addClass" v-if="rol === 'admin'" title="Añadir nueva aula">
                    <i class="fa fa-plus"></i> Añadir
                </button>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>ID aula</th>
                        <th>Nombre</th>
                        <th>Empleado</th>
                        <th>Edificio</th>
                        <th>Tipo de aula</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="classroom in classrooms" :key="classroom.ID_Aul">
                        <td>{{ classroom.ID_Aul }}</td>
                        <td>{{ classroom.Nombre }}</td>
                        <td>{{ classroom.Empleado_Nombre }}</td>
                        <td>{{ classroom.Edificio_Nombre }}</td>
                        <td>{{ classroom.TipoAula_Nombre }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
import TopBar from '../layouts/TopBar.vue'
import { onMounted, ref } from 'vue'
import { useClassroom } from '../controladores/useClassroom'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const { classrooms, getClassroomsDetail } = useClassroom()
const router = useRouter()

// Rol del usuario
const rol = ref('')

onMounted(async () => {
    // Obtener aulas
    getClassroomsDetail()

    // Obtener rol desde Firestore
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

// Navegación
const home = () => {

    if (rol.value === 'admin') {
        router.push({ name: 'InicioAdmin' })
    } else {
        router.push({ name: 'Inicio' })
    }

}
const addClass = () => {
    router.push({ name: 'InsertarSalon' })
}
</script>


<style scoped>
/* Contenedor general de la página */
.Container {
    background-color: #f4f6fa;
    min-height: 100vh;
}

.Cont {
    max-width: 100%;
    margin: 2em 3em;
    padding: 2em;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 1.8em;
    color: #4a4a4a;
    border-bottom: 2px solid #daadff;
    padding-bottom: 0.5em;
}

/* Estilos para los botones */
.btn-group {
    display: flex;
    justify-content: space-between;
    /* Alinea los botones a ambos extremos */
    margin-bottom: 1.5em;
    flex-wrap: wrap;
    /* Permite que los botones se acomoden bien en pantallas pequeñas */
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

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* Estilos de la tabla */
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
