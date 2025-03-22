<template>
    <div class="containerGod">


        <TopBar></TopBar>
        <div class=" headerPrincipal">
            <h2>Mantenimiento y servicios</h2>
            <h3>Instituto tecnologico de Culiacán</h3>
        </div>

        <ul class="navMenu">
            <li class="elementoMenu" @click="navigateToRoles('InicioAdmin')">
                Principal
            </li>
            <li class="elementoMenu" @click="navigateToRoles('Solicitudes')">
                Solicitudes
            </li>
            <li class="elementoMenu" @click="navigateToRoles('AsignarIncidente')">
                Reportes
            </li>
            <li class="elementoMenu" @click="navigateToRoles('Incidentes')">
                Incidencias
            </li>
            <li class="elementoMenu" @click="navigateToRoles('RolesA')">
                Roles
            </li>
        </ul>


        <div class="opciones">
            <section class="Users">
                <h2>Usuarios</h2>
            </section>
        </div>

        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Tipo Empleado</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="employees.length == 0">
                    <td class="centrado" colspan="6">Sin personal registrado</td>
                </tr>
                <tr v-else v-for="(employees, index) in employees" :key="employees.ID_Emp">
                    <td>{{ employees.ID_Emp }}</td>
                    <td>{{ employees.Nombre + ' ' + employees.ApellidoPat + ' ' + employees.ApellidoMat }}</td>
                    <td>{{ new Date().getFullYear() - new Date(employees.Fecha_Nac).getFullYear() }}</td>
                    <td>{{ employees.Num_tel }}</td>
                    <td>{{ employees.ID_TipEmp }}</td>
                    <td>Accion</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEmployees } from '../controladores/useEmployee'
import { useRouter } from 'vue-router'
import TopBar from '../layouts/TopBar.vue'
const { employees, getEmployees, getTechEmployees } = useEmployees()
const router = useRouter()

onMounted(async () => {
    await getEmployees()

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
</script>

<style scoped>
h2,
h3 {
    text-align: center;
    color: black;
}

tr {
    text-align: center;
    font-size: 1.1em;
    transition: all 0.3s;
}

tr:hover {
    background-color: #9afaa2;
    transition: all 0.3s;
}

td {
    padding: 2px;
    font-size: 0.9em;
}

.containerGod {
    max-width: 100%;
    width: 100%;
    background-color: rgb(255, 255, 255);
}

.table {
    width: 90%;
    justify-self: center;
}

.opciones {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    padding: 1em;
}

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

.headerPrincipal {
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.salir {
    background-color: #b91300;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.5s;
}

.salir:hover {
    background-color: #7a0796;
    transition: 0.5s;
}
</style>