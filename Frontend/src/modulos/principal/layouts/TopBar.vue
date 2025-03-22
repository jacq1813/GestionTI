<template>
    <div>
        <div class="menuPresentacion">
            <button class="salir" @click="logout">Cerrar Sesión</button>
            <span class="nombreUsuario">Usuario</span>
            <i class="fa fa-user user-icon"></i>
        </div>

        <slot />
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push({ name: 'validacion' })
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
}

.nombreUsuario {
    font-size: 1rem;
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
  