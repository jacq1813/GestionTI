

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
            <li class="elementoMenu">
                <router-link to="/usuarios">Principal</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/departamentos">Solicitudes</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/ubicaciones">Reportes</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/incidencias">Incidencias</router-link>
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
            <li class="elementoMenu">
                <router-link to="/Todas">Todas</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/Proceso">En proceso</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/Terminadas">Terminadas</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/Liberadas">Liberadas</router-link>
            </li>
            <li class="elementoMenu">
                <router-link to="/Rechazadas">Rechazadas</router-link>
            </li>
        </ul>

        <table class="table table-success table-striped">
            <thead>
                <th>ID</th>
                <th>Fecha</th>
                <th>Departamento</th>
                <th>Ubicacion</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Acciones</th>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</template>


<script>
export default {
    data() {
        return {
            seleccion: "", // Valor seleccionado
            opciones: [
                { value: "opcion1", text: "Opción 1" },
                { value: "opcion2", text: "Opción 2" },
                { value: "opcion3", text: "Opción 3" }
            ]
        };
    }
};
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

h2,
h3 {
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
    /* Centrado horizontal */
    gap: 1em;
    /* Espacio entre los elementos */
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
    /* Efecto hover */
}




.navMenu.navMenu.IncidMenu li a:hover {
    background-color: brown;
    padding: 0.7em 1.5em;

}

/* Barra superior con usuario e icono */
.menuPresentacion {
    width: 100%;
    background-color: #2c3e50;
    /* Color oscuro */
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
</style>