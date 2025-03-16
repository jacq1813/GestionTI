<template>
    <div class="contenedor">  
        <form class="formulario" @submit.prevent="signUp">
            <section class="logo-tec">
                <img src="../../img/LOGO_TEC_PNG_OK.png" alt="Instituto Tecnológico de Culiacán">
            </section>
            <h2>Registrate!</h2>
           
            <div class="grupo">
                <label>Correo</label>
                <input type="email" required v-model="email">
            </div>
            <div class="grupo">
                <label>Contraseña</label>
                <input type="password" required v-model="password">
            </div>
            <div class="grupo">
                <label>Confirmar contraseña</label>
                <input type="password" required v-model="password">
            </div>
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <button type="submit">
                Registrarse
            </button>
            <p class="registro">
                ¿Ya tienes una cuenta? <router-link to="/validacion">Inicia sesion aqui</router-link>
            </p>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import "../../firebase/config.js";

    const email = ref('');
    const password = ref();
    const error = ref(null);
    const router = useRouter();

    const signUp = async () => {
        const error = ref<string | null>(null);
        console.log(error);
        try {
            const auth = getAuth();
            const user = await createUserWithEmailAndPassword(auth, email.value, password.value);
            console.log(user);
            error.value = null;
            router.push({name: 'validacion'});
        } catch (err:any) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    error.value = 'Correo ya en uso';
                    break;
                case 'auth/weak-password':
                    error.value = 'Contraseña débil';
                    break;
                default:
                    console.log(err);
                    error.value = 'Error al registrarse';
                    break;
            }
        }
    }
</script>

<style scoped>
    .contenedor {
        max-width: 500px; 
        width: 500px;
    }

    .formulario {
        display: flex;
        flex-direction: column;
        gap: 2em;
        padding: 2em;
        border: 1px solid #DDD;
        border-radius: 5px;
        margin: 2em auto;
        background-color: #F9F9F9;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
        
    }

    .grupo {
        display: flex;
        flex-direction: column;
        color: black;
        align-items:flex-start;
        justify-content: space-between;
    
    }

    .grupo label {
        margin-bottom: 0.5em;
        color: #7a0796;
        font-weight: bold;
        font-size: .9em;
    }

    h2 {
        text-align: center;
        color: black;
    }

    input {
        padding: 8px;
        border: 1px solid #DDD;
        border-radius: 5px; 
        width: 100%;
        
    }

    button {
        padding: 10px;
        background-color:  #7a0796;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        align-self: center;
        width: 100%;
    }

    .error {
        color: red;
        font-size: 0.9em;
        margin-top: 0.5em;
    }

    .logo-tec img {
        width: 50%;
        margin: 0 auto;
        
    }

    .logo-tec {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1em;
    }

    .registro{
        text-align: center;
        color: #7a0796;
    }
</style>