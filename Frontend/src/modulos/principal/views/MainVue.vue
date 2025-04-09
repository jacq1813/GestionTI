<template>
    <div class="Contenedor">

        <TopBar></TopBar>
        <div class=" headerPrincipal">
            <h2>Mantenimiento y servicios</h2>
            <h3>Instituto tecnologico de Culiacán</h3>
        </div>

        <ul class="navMenu">
            <li class="elementoMenu" @click="navigateToRoles('ActualizarIncidente')">
                Solicitudes
            </li>
            <li class="elementoMenu">
                Reportes
            </li>
            <li class="elementoMenu" @click="navigateToRoles('Incidentes')">
                Incidencias
            </li>
        </ul>
        <br>

        <div class="opciones">
            <section class="Incidencias">
                <h2>Incidencias</h2>
            </section>
            <section class="periodoYano">
                <section class="caja1">
                    <label class="periodo">Periodo</label>
                    <select v-model="periodSelected" id="opcion" @change="logSeleccion">
                        <option v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">
                            {{ opcion.value }}
                        </option>
                    </select>
                </section>
                <section class="caja2">
                    <label class="periodo">Año</label>
                    <select v-model="yearSelected" id="anio" @change="logAnio">
                        <option v-for="anio in aniosDisponibles" :key="anio" :value="anio">
                            {{ anio }}
                        </option>
                    </select>
                </section>
            </section>
        </div>


        <ul class="navMenu IncidMenu">
            <li class="elementoMenu" @click="fetchData('Todas')">
                Todas
            </li>
            <li class="elementoMenu" @click="fetchData('En proceso')">
                En proceso
            </li>
            <li class="elementoMenu" @click="fetchData('Terminadas')">
                Terminadas
            </li>
            <li class="elementoMenu" @click="fetchData('Liberadas')">
                Liberadas
            </li>
            <li class="elementoMenu" @click="fetchData('Rechazadas')">
                Rechazadas
            </li>
        </ul>

        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Periodo</th>
                    <th>Hora</th>
                    <th>Aula</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="incidents.length == 0">
                    <td class="centrado" colspan="6">Sin personal registrado</td>
                </tr>
                <tr v-else v-for="(incident, index) in incidents" :key="incident.Folio">
                    <td>{{ incident.Folio }}</td>
                    <td>{{ incident.Fecha.split('T')[0] }}</td>
                    <td>{{ incident.Periodo }}</td>
                    <td>{{ incident.Hora }}</td>
                    <td>{{ incident.Aula }}</td>
                    <td>{{ incident.Descripcion }}</td>
                    <td>{{ incident.Estado }}</td>
                    <td>Accion</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useIncidents } from '../controladores/useIncidents'
import { useRouter } from 'vue-router'
import TopBar from '../layouts/TopBar.vue'

const { incidents, getIncidents, getIncidentsRecandEmi, getIncidentsByEstado, getIncidentsByEstadoPeriodoAnio } = useIncidents()
const router = useRouter()
const periodSelected = ref('Selecciona periodo') // Default value or initial period
const yearSelected = ref('Selecciona año') // Default value or initial year

//Cuando la pagina es visible y esta cargada
onMounted(async () => {
    await getIncidentsRecandEmi()
    periodSelected.value = 'Enero - Junio'
    yearSelected.value = '2021'
})

//cerrar sesion
const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' })
}

const navigateToRoles = (direction: string) => {
    console.log(direction)
    router.push({ name: direction })
};

//se actualiza la tabla de incidencias dependiendo de la opcion seleccionada
const logSeleccion = () => {
    periodSelected.value
}
const logAnio = () => {
    yearSelected.value
}

const opciones = [
    { value: 'Enero - Junio' },
    { value: 'Verano' },
    { value: 'Agosto - Diciembre' },

]

const aniosDisponibles = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
]

const fetchData = async (type: string) => {
    switch (type) {
        case 'Todas':
            console.log("entro aqui")
            await getIncidentsRecandEmi()
            break
        case 'En proceso':
            await getIncidentsByEstadoPeriodoAnio('En proceso', periodSelected.value, yearSelected.value)
            break
        case 'Terminadas':
            await getIncidentsByEstadoPeriodoAnio('Terminada', periodSelected.value, yearSelected.value)
            break
        case 'Liberadas':
            await getIncidentsByEstadoPeriodoAnio('Liberada', periodSelected.value, yearSelected.value)
            break
        case 'Rechazadas':
            await getIncidentsByEstadoPeriodoAnio('Rechazada', periodSelected.value, yearSelected.value)
            break
    }
}
</script>

<style scoped>
.Contenedor {
    background-color: #f8f9fa;
    width: 100%;
    min-height: 100vh;
}

li {
    list-style: none;
}

/* Encabezado */
.headerPrincipal {
    background-color: #ffffff;
    padding: 2em;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1em;
}

.headerPrincipal h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.2em;
}

.headerPrincipal h3 {
    font-size: 1.1rem;
    color: #7f8c8d;
}

/* Menú de navegación */
.navMenu {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #ffffff;
    padding: 1em;
    gap: 1em;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 90%;
    margin: 0 auto;
}

.navMenu.IncidMenu {
    background-color: #ffffff;
    border: 1px solid #ccc;
}

.elementoMenu {
    background-color: #2c3e50;
    color: white;
    padding: 0.6em 1.2em;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.elementoMenu:hover {
    background-color: #1abc9c;
}

/* Filtros */
.opciones {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto 1.5em;
    padding: 1em;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.Incidencias h2 {
    font-size: 1.5rem;
    color: #2c3e50;
}

.periodoYano {
    display: flex;
    gap: 1em;
}

.periodo {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.3em;
    margin-right: .5em;
}

select {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    font-size: 1rem;
}

/* Tabla */
.table {
    width: 90%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    border-collapse: collapse;
    margin-bottom: 5em;
}

th {
    background-color: #2c3e50;
    color: white;
    padding: 0.75em;
    text-align: center;
}

td {
    padding: 0.75em;
    border-bottom: 1px solid #ddd;
    text-align: center;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

/* Botón de cerrar sesión */
.salir {
    background-color: #e74c3c;
    color: white;
    padding: 0.6em 1.2em;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

.salir:hover {
    background-color: #c0392b;
}

/* Responsividad */
@media (max-width: 768px) {
    .opciones {
        flex-direction: column;
        gap: 1em;
    }

    .periodoYano {
        flex-direction: column;
        width: 100%;
    }

    .navMenu {
        flex-direction: column;
        align-items: center;
    }
}
</style>