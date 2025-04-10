<template>
    <div>

        <div class="menuPresentacion">


            <span class="nombreUsuario">{{ nombre }}</span>

            <!-- Icono de usuario con menú desplegable al pasar el cursor -->
            <div class="user-menu" @mouseenter="menuOpen = true" @mouseleave="menuOpen = false">
                <i class="fa fa-user user-icon"></i>

                <div v-if="menuOpen" class="dropdown-menu">
                    <a href="#" @click="navigate('RolesA')" v-if="rol == 'admin'">Usuarios</a>
                    <a href="#" @click="navigate('Edificios')">Edificios</a>
                    <a href="#" @click="navigate('Salones')">Aulas</a>
                    <a href="#" @click="navigate('Dispositivos')">Equipos</a>
                    <a href="#" @click="navigate('Bitacora')" v-if="rol == 'Jefe de taller'">Bitacora</a>
                    <a href="#" @@click="navigate('Incidentes')" v-if="rol == 'usuario'">Reportar incidencia</a>
                    <a href="#" @click="navigate('RolesA')" v-if="rol == 'admin'">Roles</a>
                    <a href="#" @click="navigate('AsignarIncidente')" v-if="rol == 'Jefe de taller'">Asignar incidencia</a>
                    <hr>
                    <a href="#" @click="logout">Cerrar Sesión</a>
                </div>
            </div>
        </div>

        <slot />
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const router = useRouter()
const menuOpen = ref(false)

const auth = getAuth()
const user = auth.currentUser

const rol = ref('')
const nombre = ref('')

onMounted(async () => {
    if (user) {
        const db = getFirestore()
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid))
        if (userDoc.exists()) {
            const data = userDoc.data()
            rol.value = data.Rol
            nombre.value = data.Nombre || 'Usuario'
        }
    }
})

const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.push({ name: 'validacion' })
}

const navigate = (direction: string) => {
    console.log(direction)
    router.push({ name: direction })
}


</script>
  
<style scoped>
/* Estilos del menú */
.menuPresentacion {
    width: 100%;
    background-color: #7a0796;
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.8em 1.5em;
    font-weight: bold;
    gap: 0.7em;
    position: relative;
    box-shadow: 0 2px 4px rgba(3, 0, 0, .3);

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
