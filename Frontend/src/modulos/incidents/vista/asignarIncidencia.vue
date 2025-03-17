<template>
    <div class="container">
        <h2>Asignar incidencia</h2>

        <label class="subT">Datos de la incidencia</label>
        <div class="top">
            <div class="grupo">
                <label>Folio de incidencia</label>
                <input type="text" placeholder="# Folio" disabled>
            </div>
            <div class="grupo">
                <label>Edificio</label>
                <input type="text" placeholder="Edificio" disabled>
            </div>
            <div class="grupo">
                <label>Aula</label>
                <input type="text" placeholder="Aula" disabled>
            </div>
        </div>

        <div class="grupo">
            <label>Descripción</label>
            <input class="desc" type="text" placeholder="Descripción" disabled>
        </div>

        <hr>

        <label class="subT">Seleccionar técnico</label>
        <div class="grupoB">
            <select>
                <option v-for="opcion in techEmployees" :key="opcion.ID_Emp" :value="opcion.ID_Emp">
                    {{ opcion.Nombre + ' ' + opcion.ApellidoPat + ' ' + opcion.ApellidoMat }}
                </option>
            </select>
            <button type="button">Asignar</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTechEmployees } from '../controladores/useEmployees.ts';

const { techemployees: techEmployees, getTechEmployees } = useTechEmployees();

onMounted(async () => {
    await getTechEmployees();
});
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

select {
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid #ced4da;
    font-size: 1em;
    width: 100%;
}
</style>
