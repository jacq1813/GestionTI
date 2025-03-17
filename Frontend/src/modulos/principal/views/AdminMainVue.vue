<template>
    <div class="Contenedor">

    <div class="menuPresentacion">
        <span class="nombreUsuario">Usuario</span>
        <i class="fa fa-user user-icon"></i>
    </div>

    <div class=" headerPrincipal">
        <h2>Mantenimiento y servicios ADMIIIIIN</h2>
        <h3>Instituto tecnologico de Culiacán</h3>
    </div>

    <ul class="navMenu">
        <li class="elementoMenu">
            Principal
        </li>
        <li class="elementoMenu">
            Solicitudes
        </li>
        <li class="elementoMenu">
            Reportes
        </li>
        <li class="elementoMenu">
            Incidencias
        </li>
        <li class="elementoMenu">
            Roles
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
    import { useEmployees } from '../controladores/useEmployee'
    const { employees, getEmployees,getTechEmployees} = useEmployees()
    const { incidents,getIncidents,getIncidentsRecandEmi,getIncidentsByEstado,getIncidentsByEstadoPeriodoAnio } = useIncidents()

    const periodSelected = ref('Selecciona periodo') // Default value or initial period
    const yearSelected = ref('Selecciona año') // Default value or initial year

    //Cuando la pagina es visible y esta cargada
    onMounted(async () => {
        await getIncidents()
        periodSelected.value = 'Enero - Junio'
        yearSelected.value = '2021'
    })

    //se actualiza la tabla de incidencias dependiendo de la opcion seleccionada
    const logSeleccion = () => {
        periodSelected.value
    }
    const logAnio = () => {
        yearSelected.value
    }

    const opciones = [
        { value: 'Enero - Junio'},
        { value: 'Verano'},
        { value: 'Agosto - Diciembre'},

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
                await getIncidentsRecandEmi()
                break
            case 'En proceso':
                await getIncidentsByEstadoPeriodoAnio('En proceso',periodSelected.value,yearSelected.value)
                break
            case 'Terminadas':
                await getIncidentsByEstadoPeriodoAnio('Terminada',periodSelected.value,yearSelected.value)
                break
            case 'Liberadas':
                await getIncidentsByEstadoPeriodoAnio('Liberada',periodSelected.value,yearSelected.value)
                break
            case 'Rechazadas':
                await getIncidentsByEstadoPeriodoAnio('Rechazada',periodSelected.value,yearSelected.value)
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
    .Incidencias {
        display: flex;
        align-items: center;
        width: 50%;
    }

    .periodo {
        display: flex;
        font-size: 1.2rem;
        font-weight: bold;
        color: black;
        align-items: self-end;
        justify-content: center;
    }

    .periodoYano {
        display: grid;
        flex-flow: row wrap;
        width: 50%;
        justify-content: flex-end;
    }

    .caja1 {
        display: flex;
        flex-flow: column wrap;
        gap: 0.5em;
        justify-content: space-between;
    }

    .caja2 {
        display: flex;
        flex-flow: column wrap;
    }
</style>