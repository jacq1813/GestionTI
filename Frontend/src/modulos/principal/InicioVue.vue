<template>
    <div class="Contenedor">

    <div class="menuPresentacion">
        <span class="nombreUsuario">Usuario</span>
        <i class="fa fa-user user-icon"></i>
    </div>

    <div class=" headerPrincipal">
        <h2>Mantenimiento y servicios</h2>
        <h3>Instituto tecnologico de Culiacán</h3>
    </div>

    <ul class="navMenu">
        <li class="elementoMenu" @click="fetchData('principal')">
            Principal
        </li>
        <li class="elementoMenu" @click="fetchData('solicitudes')">
            Solicitudes
        </li>
        <li class="elementoMenu" @click="fetchData('reportes')">
            Reportes
        </li>
        <li class="elementoMenu" @click="fetchData('incidencias')">
            Incidencias
        </li>
    </ul>
    <br>

    <div class="opciones">
        <h2>Incidencias</h2>
        <label for="">Periodo</label>
        <select v-model="seleccion" id="opcion">
            <option v-for="opcion in opciones" :key="opcion.value" :value="opcion.value">
                {{ opcion.text }}
            </option>
        </select>
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
import { useIncidents } from '../principal/controladores/useIncidents'
const { incidents,getIncidents,getIncidentsLiberada,getIncidentsRecandEmi,getIncidentsProceso,getIncidentsRechazada,getIncidentsTerminada } = useIncidents()

const seleccion = ref('1')

//Cuando la pagina es visible y esta cargada
onMounted(async () => {
    await getIncidents()
})

const opciones = [
    { value: '1', text: 'Hoy' },
    { value: '2', text: 'Ayer' },
    { value: '3', text: 'Esta semana' },
    { value: '4', text: 'Este mes' },
    { value: '5', text: 'Este año' },
    { value: '6', text: 'Todos' }
]

const fetchData = async (type: string) => {
    switch (type) {
        case 'Todas':
            await getIncidents()
            break
        case 'En proceso':
            await getIncidentsProceso()
            break
        case 'Terminadas':
            await getIncidentsTerminada()
            break
        case 'Liberadas':
            await getIncidentsLiberada()
            break
        case 'Rechazadas':
            await getIncidentsRechazada()
            break
    }
}
</script>

<style scoped>
template {
    display: flex;
}

.headerPrincipal {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h2,h3 {
    text-align: center;
    color: black;
}

.Contenedor {
    max-width: 100%;
    width: 100%;
    background-color: rgb(255, 255, 255);
}

.table {
    width: 90%;
    justify-self: center;
}

.navMenu {
    display: flex;
    justify-content: center;
    background-color: #424951;
    padding: 0.8em;
    border-radius: 8px;
    width: 90%;
    margin: 0 auto;
    gap: 1em;
}

.navMenu.IncidMenu {
    background-color: #6c757d;
    font-size: small;
    margin-top: 1em;
    padding: 0.5em;
    border-radius: 8px 8px 0 0;
}

.navMenu li {
    list-style: none;
}

.navMenu li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 0.8em 1.5em;
    transition: background-color 0.3s ease-in-out;
}

.navMenu li a:hover {
    background-color: #1abc9c;
}

.navMenu.navMenu.IncidMenu li a:hover {
    background-color: brown;
    padding: 0.7em 1.5em;
}

/* Barra superior con usuario e icono */
.menuPresentacion {
    width: 100%;
    background-color: #2c3e50;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.8em 1.5em;
    font-weight: bold;
    gap: 0.7em;
}

.nombreUsuario {
    font-size: 1rem;
}

.iconoUsuario {
    cursor: pointer;
    transition: color 0.3s ease;
}

.iconoUsuario:hover {
    color: #1abc9c;
}

.opciones {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    padding: 1em;
}

.elementoMenu {
    background-color: #424951;
    border-radius: 8px;
    padding: 0.24em 1em;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.elementoMenu:hover {
    background-color: #1abc9c;
    transition: background-color 0.3s ease-in-out;
}
</style>