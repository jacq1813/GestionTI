<template>
    <div>
        <div class="menuPresentacion">


            <span class="nombreUsuario">Usuario</span>

            <!-- Icono de usuario con menú desplegable al pasar el cursor -->
            <div class="user-menu" @mouseenter="menuOpen = true" @mouseleave="menuOpen = false">
                <i class="fa fa-user user-icon"></i>

                <div v-if="menuOpen" class="dropdown-menu">
                    <a href="#" @click="navigate('RolesA')">Usuarios</a>
                    <a href="#" @click="navigate('Edificios')">Edificios</a>
                    <a href="#" @click="navigate('Salones')">Aulas</a>
                    <a href="#" @click="navigate('equipos')">Equipos</a>
                    <hr>
                    <a href="#" @click="logout">Cerrar Sesión</a>
                </div>
            </div>
        </div>

        <slot />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false) // Estado del menú desplegable

const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' })
}

// Función para navegar a las secciones
const navigate = (direction: string) => {
    console.log(direction)
    router.push({ name: direction })
}


</script>
  
<style scoped>
/* Estilos del menú */
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
    position: relative;
}

.nombreUsuario {
    font-size: 1rem;
}

/* Botón de salir */
.salir {
    background-color: #b91300;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
}

.salir:hover {
    background-color: #7a0796;
}

/* Estilos del icono de usuario */
.user-menu {
    position: relative;
    display: inline-block;
}

.user-icon {
    font-size: 1.5rem;
    cursor: pointer;
}

/* Estilos del menú desplegable */
.dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    background-color: white;
    color: black;
    border-radius: 4px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    padding: 0.5em 0;
    display: flex;
    flex-direction: column;
    z-index: 100;
}

.dropdown-menu a {
    text-decoration: none;
    color: black;
    padding: 0.5em 1em;
    display: block;
    transition: background 0.3s;
}

.dropdown-menu a:hover {
    background-color: #f0f0f0;
}
</style>
