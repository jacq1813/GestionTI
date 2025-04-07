<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Edificios</h2>

            <div class="classboton">
                <button class="btn btn-secondary" @click="home">Regresar</button>
                <button class="btn btn-secondary" @click="anadir" v-if="rol === 'admin'">Añadir</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID edificio</th>
                        <th>Nombre</th>
                        <th>Empleado</th>
                        <th>Departamento</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="building in buildings" :key="building.ID_Edif">
                        <td>{{ building.ID_Edif }}</td>
                        <td>{{ building.Nombre }}</td>
                        <td>{{ building.ID_Emp }}</td>
                        <td>{{ building.Nombre_Departamento }}</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script setup lang="ts">
import TopBar from '../layouts/TopBar.vue'
import { onMounted, ref, computed } from 'vue'
import { useBuilding } from '../controladores/useBuilding';
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const rol = ref('')

const { buildings, getBuilding } = useBuilding();

const router = useRouter();

onMounted(async () => {
    await getBuilding();
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (user) {
        const userDoc = doc(db, 'Usuarios', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            rol.value = docSnap.data().Rol;
        } else {
            console.log('No such document!');
        }
    } else {
        console.log('No user is signed in');
    }
})

const home = () => {
    router.push({ name: 'Inicio' });
}

const anadir = () => {
    router.push({ name: 'InsertaEdificio' })
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
