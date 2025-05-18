<template>
    <div class="container">
        <TopBar></TopBar>

        <div class="content">
            <h2>Actualizar solución</h2>

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
                <div class="grupo">
                    <label>Causa actual:</label>
                    <input type="text" :value="selectedProblem?.['Causa del problema']" disabled />
                </div>
            </div>

            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="solucion">Seleccione solución:</label>
                    <select v-model="selectedSolucionId" id="solucion" class="form-control" @change="handleSolucionChange">
                        <option v-for="solucion in solucionProblemas" :key="solucion.ID_Solucion"
                            :value="solucion.ID_Solucion">
                            {{ solucion.Descripcion }}
                        </option>
                        <option :value="-1">Otro...</option>
                    </select>
                </div>

                <div v-if="mostrarOtroInput" class="form-group mt-2">
                    <label for="otraSolucion">Especifique otra solución:</label>
                    <input type="text" id="otraSolucion" v-model="otroTexto" class="form-control"
                        placeholder="Ingrese la nueva solución" required />
                </div>

                <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from '../../principal/layouts/TopBar.vue';
import { useProblemas } from '../controladores/useProblemas';
import { useSolucionProblema } from '../controladores/usesolucionProblema';
import type { ProblemsDetails } from '../interface/interface-problemas';

const router = useRouter()
const route = useRoute()

const { getProblemaById, updateProblemaS } = useProblemas()
const { solucionProblemas, getSolucionProblemas, addSolucionProblema } = useSolucionProblema()

const selectedProblem = ref<ProblemsDetails | null>(null)
const selectedSolucionId = ref<number>(0)
const mostrarOtroInput = ref<boolean>(false)
const otroTexto = ref<string>('')
const isLoading = ref<boolean>(true)

onMounted(async () => {
    try {
        // Cargar soluciones disponibles
        await getSolucionProblemas()
        console.log("Soluciones disponibles:", solucionProblemas.value)
        console.log(solucionProblemas.value)

        // Obtener ID del problema de la ruta
        const problemId = Number(route.query.id)
        if (!problemId || isNaN(problemId)) {
            throw new Error('ID de problema no válido')
        }

        // Obtener datos del problema
        const problemData = await getProblemaById(problemId)
        const problemaData2 = await
            console.log("Datos del problema:", problemData)
        if (!problemData) {
            throw new Error('No se encontró el problema solicitado')
        }

        selectedProblem.value = problemData[0]
        console.log("Problema seleccionado:", selectedProblem.value)
        selectedSolucionId.value = selectedProblem.value.ID_Solucion || 0
    } catch (error) {
        console.error('Error al cargar datos:', error)
        router.push({ name: 'Problemas' })
    } finally {
        isLoading.value = false
    }
})

const handleSolucionChange = () => {
    mostrarOtroInput.value = selectedSolucionId.value === -1
    if (!mostrarOtroInput.value) {
        otroTexto.value = ''
    }
}

const submitForm = async () => {
    if (!selectedProblem.value) return

    try {
        let solucionId = selectedSolucionId.value

        // Si seleccionó "Otro", crear nueva solución
        if (solucionId === -1) {
            if (!otroTexto.value.trim()) {
                alert('Por favor ingrese la descripción de la nueva solución')
                return
            }

            const nuevaSolucion = await addSolucionProblema({
                Descripcion: otroTexto.value.trim()
            })

            console.log("Nueva solución creada:", nuevaSolucion.id)

            if (nuevaSolucion && nuevaSolucion.id) {
                console.log("ID de nueva solución:", nuevaSolucion.id)
                console.log(solucionId)
                solucionId = nuevaSolucion.id
            } else {
                throw new Error('No se pudo crear la nueva solución')
            }
        }

        // Actualizar el problema con la nueva solución
        const problemaActualizado = await updateProblemaS({
            ID_Emp: selectedProblem.value.ID_Emp,
            ID_Solucion: solucionId,
            Folio_Incidencia: selectedProblem.value.Folio.toString()
        })

        if (problemaActualizado.error) {
            throw new Error(problemaActualizado.error);
        }

        console.log("Problema actualizado correctamente")
    } catch (error) {
        console.error('Error al guardar cambios:', error)
        alert('Ocurrió un error al guardar los cambios')
    }
}

const goBack = () => {
    router.push({ name: 'Problemas' })
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

.mt-2 {
    margin-top: 0.5rem;
}
</style>