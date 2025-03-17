<template>
    <div class="container">

        <h2>Asignar incidencia</h2>

        <label>Datos de la incidencia</label>
        <div class="grupo">

            <label>Folio de incidencia</label>
            <input type="text" placeholder="# Folio" disabled="true">

        </div>

        <div class="grupo">

            <label>Descripciosn</label>
            <input type="text" placeholder="Descripcion" disabled="true">
        </div>

        <br>

        <label>Seleccionar tecnico</label>

        <div class="grupo">
            <select>
                <option v-for="opcion in techEmployees" :key="opcion.ID_Tecnico" :value="opcion.ID_Tecnico">
                    {{ opcion.Nombre }}
                </option>
            </select>
        </div>



    </div>
</template>


<script setup lang="ts">

import { onMounted, ref, computed } from 'vue'
import { useTechEmployees } from '../controladores/useEmployees.ts';
const { techemployees, getTechEmployees } = useTechEmployees();

onMounted(async () => {
    await getTechEmployees();
});

</script>