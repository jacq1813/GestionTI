<template>
    <div class="container">

        <h2>Reportar incidencia</h2>

        <!-- Realizar repirte de una incidencia -->

        <form class="formulario">


            <div class="top">
                <div class="grupo">
                    <input type="text" placeholder="# Folio" disabled="true">
                </div>

                <div class="grupo">
                    <label>Edificio</label>
                    <select v-model="selectedBuilding">
                        <option v-for="opcion in buildings" :key="opcion.ID_Edif" :value="opcion.ID_Edif">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>

                <div class="grupo">
                    <label>Aula</label>
                    <select>
                        <option v-for="opcion in filteredClassrooms" :key="opcion.ID_Aula" :value="opcion.Nombre">
                            {{ opcion.Nombre }}
                        </option>
                    </select>
                </div>


            </div>

            <div class="grupoD">
                <label for="tipo">Descripcion</label>
                <input class="desc" type="text" placeholder="Descripcion">
            </div>



            <button type="button">Enviar</button>
        </form>

    </div>
</template>


<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useClassroom } from './controladores/useClassroom';
import { useBuilding } from './controladores/useBuilding';

const { buildings, getBuilding } = useBuilding();
const { classrooms, getClassroom } = useClassroom();

const selectedBuilding = ref<number | null>(null);

// Filtrar aulas basadas en el edificio seleccionado
const filteredClassrooms = computed(() => {
    return classrooms.value.filter(aula => aula.ID_Edif === selectedBuilding.value);
});

// Cargar los datos cuando la página se monte
onMounted(async () => {
    await getBuilding();
    await getClassroom();
});


</script>


<style scoped>
.container {
    max-width: 80%;
    width: 80%;
    height: 1000px;
    background-color: rgb(255, 255, 255);
    color: black;

}

h2 {
    text-align: center;
    margin: 2em;
    color: black;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 2em auto;
    background-color: #F9F9F9;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);


}


.top {
    display: flex;
    gap: 2em;
    justify-content: first baseline;
}



.grupo {
    display: flex;
    flex-direction: row;
    gap: 1em;
    color: black;
    align-items: flex-start;
    justify-content: space-between;

}

.desc {
    width: 100%;
    height: 100px;
}

button {
    width: 100%;
    padding: .5em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.3s;
}
</style>