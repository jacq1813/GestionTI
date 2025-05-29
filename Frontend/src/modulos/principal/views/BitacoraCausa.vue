<template>
    <div class="container">
        <TopBar></TopBar>

        <div class="content">
            <h2>Actualizar causa raíz</h2>

            <div class="boton">
                <button class="btn btn-secondary" @click="goBack">Regresar</button>
            </div>

            <div class="top">
                <div class="grupo">
                    <label>Folio de diagnóstico</label>
                    <input type="text" :value="selectedProblem?.ID_Problema" disabled />
                </div>
                <div class="grupo">
                    <label>Folio de incidencia</label>
                    <input type="text" :value="selectedProblem?.Folio" disabled />
                </div>
                <div class="grupo">
                    <label>Descripción de la incidencia</label>
                    <input type="text" :value="selectedProblem?.['Descripcion de Incidencia']" disabled />
                </div>
            </div>

            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="causa">Causa del problema:</label>
                    <select v-model="selectedCauseId" id="causa" class="form-control" @change="handleCausaChange">
                        <option v-for="causa in causasProblemas" :key="causa.ID_Causa" :value="causa.ID_Causa">
                            {{ causa.Descripcion }}
                        </option>
                        <option :value="-1">Otro...</option>
                    </select>
                </div>

                <div v-if="mostrarOtroInput" class="form-group mt-2">
                    <label for="otraCausa">Especifique otra causa:</label>
                    <input type="text" id="otraCausa" v-model="otroTexto" class="form-control"
                        placeholder="Ingrese la causa del problema" />
                </div>


                <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </form>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from '../../principal/layouts/TopBar.vue'

import { useCausaProblema } from '../controladores/usecausaProblema'
import { useProblemas } from '../controladores/useProblemas'

const router = useRouter()
const route = useRoute()

const { causasProblemas, getCausaProblema, addCausaProblema } = useCausaProblema()
const { getProblemaById, updateProblema } = useProblemas()

const selectedProblem = ref<any>(null)
const selectedCauseId = ref<number>(0)
const otroTexto = ref('')
const mostrarOtroInput = ref(false)
const handleCausaChange = () => {
    mostrarOtroInput.value = selectedCauseId.value === -1
    if (!mostrarOtroInput.value) {
        otroTexto.value = ''
    }
}


onMounted(async () => {
    const problemId = Number(route.query.id)
    console.log("ID del problema:", route.query.id)
    const problema = await getProblemaById(problemId)

    await getCausaProblema()
    console.log("causas", causasProblemas.value)
    causasProblemas.value.forEach(causa => {
        console.log("ID:", causa.ID_Causa, "Descripción:", causa.Descripcion)
    })

    console.log("llego a esto ")
    console.log(problema)

    if (problema) {
        console.log("Problema encontrado:", problema)
        selectedProblem.value = problema[0]

        selectedCauseId.value = selectedProblem.value.ID_Causa || 0

        // selectedCauseId.value = problema.ID_Causa || 0
    }
})


const submitForm = async () => {
    if (!selectedProblem.value) return;

    try {
        let causaId = selectedCauseId.value;
        console.log("ID de causa seleccionada:", causaId);

        if (causaId === -1 && otroTexto.value.trim() !== '') {
            console.log("Otra causa:", otroTexto.value);
            const nuevaCausa = await addCausaProblema({ Descripcion: otroTexto.value.trim() });

            if (nuevaCausa && nuevaCausa.id) {
                console.log("Nueva causa agregada:", nuevaCausa);
                causaId = nuevaCausa.id;
            } else {
                throw new Error('No se pudo agregar la nueva causa');
            }
        }

        const problemaActualizado = await updateProblema({
            ID_Emp: selectedProblem.value.ID_Emp,
            ID_Causa: causaId,
            ID_Solucion: selectedProblem.value.ID_Solucion ?? null,
            Folio_Incidencia: selectedProblem.value.Folio
        });

        console.log("Problema actualizado:", selectedProblem.value.ID_Emp);
        console.log("ID de causa:", causaId);
        console.log("ID de solución:", selectedProblem.value.ID_Solucion);
        console.log("Folio de incidencia:", selectedProblem.value.Folio);
        if (problemaActualizado.error) {
            throw new Error(problemaActualizado.error);
        }

        console.log("Problema actualizado correctamente");
        router.push({name:'BitacoraProb'});

    } catch (error) {
        console.error('Error al actualizar el problema:', error);
    }
};



const goBack = () => {
    router.push({ name: 'BitacoraProb' })
}
</script>
  

<style scoped>
.container {
    max-width: 100%;
    width: 100%;
    min-height: 100vh;
    background-color: rgb(255, 255, 255);
    color: black;
}

.content {
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
    border-bottom: 2px solid #daadff;
    margin-bottom: 1em;
}

.top {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5em;
    margin-bottom: 2em;
    padding: 1em;
    background-color: #f0f0f0;
    border-radius: 8px;
}

.grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}

.grupo label {
    font-weight: 600;
    color: #555;
}

.form-group {
    margin-bottom: 1.5em;
}

label {
    display: block;
    margin-bottom: 0.5em;
    font-size: 16px;
    color: #333;
    font-weight: 600;
}

input,
select {
    width: 100%;
    padding: 0.75em;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
}

input:disabled {
    background-color: #f5f5f5;
    color: #666;
}

button {
    margin-top: 1em;
    padding: 0.75em 1.5em;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
    align-self: flex-start;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.btn-primary {
    background-color: #6f42c1;
    color: white;
}

.btn-primary:hover {
    background-color: #5a32a3;
}

.boton {
    margin-bottom: 1em;
}
</style>