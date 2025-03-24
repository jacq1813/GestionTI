<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Registrar Edificio</h2>

            <div class="classboton">
                <button class="btn btn-secondary" @click="home">Regresar</button>
            </div>

            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="nombre">Nombre del Edificio:</label>
                    <input type="text" v-model="newBuilding.Nombre" id="nombre" required class="form-control">
                </div>

                <div class="form-group">
                    <label for="empleado">Empleado:</label>
                    <select v-model="newBuilding.ID_Emp" id="empleado" required class="form-control">
                        <option v-for="empleado in employees" :key="empleado.ID_Emp" :value="empleado.ID_Emp">
                            {{ empleado.Nombre }} {{ empleado.ApellidoPat }} {{ empleado.ApellidoMat }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="departamento">Departamento:</label>
                    <select v-model="newBuilding.ID_TipDpto" id="departamento" required class="form-control">

                    </select>
                </div>

                <button type="submit" class="btn btn-primary">Registrar Edificio</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import TopBar from '../layouts/TopBar.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployees } from '../controladores/useEmployee'
const { employees, getEmployees } = useEmployees()


onMounted(async () => {
    await getEmployees()

})

//const { empleados, departamentos, addBuilding } = useBuilding();

const router = useRouter();

const newBuilding = ref({
    Nombre: '',
    ID_Emp: '',
    ID_TipDpto: ''
});

const submitForm = () => {
    //addBuilding(newBuilding.value);
    router.push({ name: 'Edificios' });
}

const home = () => {
    router.push({ name: 'Inicio' });
}

onMounted(() => {
    // Cargar los empleados y departamentos
    //empleados();
    //departamentos();
});
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

.form-group {
    margin-bottom: 1em;
}

label {
    font-size: 16px;
    color: #333;
}

input,
select {
    width: 100%;
    padding: 0.5em;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    margin-top: 1em;
}
</style>
