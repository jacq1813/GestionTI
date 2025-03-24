<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Aulas</h2>

            <div class="classboton">
                <button class="btn btn-secondary" @click="home">Regresar</button>
                <button class="btn btn-secondary" @click="addClass">Añadir</button>
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
import { onMounted, ref, computed } from 'vue'
import { useClassroom } from '../controladores/useClassroom';


import { useRouter } from 'vue-router'

const { classrooms, getClassroomsDetail } = useClassroom();

const router = useRouter();

onMounted(() => {
    getClassroomsDetail();
})

const home = () => {
    router.push({ name: 'Inicio' });
}
const addClass = () => {
    router.push({ name: 'InsertarSalon' });
}
</script>

<style scoped>
.container {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    color: black;
}

.Cont {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 2em 3em;
    background-color: #F9F9F9;
}

h2 {
    text-align: center;
    padding: 1em;
    color: #333;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1em;
    border-radius: 8px;
    overflow: hidden;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 14px;
}

th {
    background-color: #daadff;
    color: white;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}
</style>
