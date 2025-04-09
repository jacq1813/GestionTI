<template>
    <div class="contenedor">
        <form class="formulario" @submit.prevent="signIn">
            <section class="logo-tec">
                <img src="../../img/LOGO_TEC_PNG_OK.png" alt="Instituto Tecnológico de Culiacán">
            </section>
            <h2>Bienvenido</h2>

            <div class="grupo">
                <label>Correo</label>
                <input type="email" required v-model="email">
            </div>
            <div class="grupo">
                <label>Contraseña</label>
                <input type="password" required v-model="password">
            </div>
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Ingresando...' : 'Ingresar' }}
            </button>
            <p class="registro">
                ¿No tienes cuenta? <router-link to="/registro">Regístrate</router-link>
            </p>
        </form>
    </div>
</template>
<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import "../../firebase/config.js";


const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const loading = ref(false);
const router = useRouter();

const signIn = async () => {
    error.value = null;
    loading.value = true;

    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Obtener datos del usuario desde Firestore
        const db = getFirestore();
        const userDocRef = doc(db, 'usuarios', user.uid);

        //pendiente por ver
        console.log(db);
        console.log(userDocRef, 'usuarios', user.uid);
        console.log(user.uid);
        console.log(user);
        const userDoc = await getDoc(userDocRef);
        await updateDoc(userDocRef, {
            ultimoLogin: new Date()
        });

        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log(userData);

            // Redirigir según el rol
            if (userData.Rol === 'admin') {
                router.push({ name: 'InicioAdmin' });
            } else if (userData.Rol === 'usuario') {
                router.push({ name: 'Inicio' }); // Ruta para usuarios regulares
            } else {
                router.push({ name: 'InicioJefe' }); // Ruta para usuarios regulares
            }
        } else {
            // Si no existe el documento en Firestore, crear uno con rol predeterminado
            // Nota: Esto podrías implementarlo si quieres, pero mejor hacerlo en el registro
            router.push({ name: 'Inicio' }); // Asumimos rol de usuario regular
        }
    } catch (err: any) {
        switch (err.code) {
            case 'auth/user-not-found':
                error.value = 'Usuario no encontrado';
                break;
            case 'auth/wrong-password':
                error.value = 'Contraseña incorrecta';
                break;
            case 'auth/invalid-email':
                error.value = 'Correo electrónico inválido';
                break;
            case 'auth/too-many-requests':
                error.value = 'Demasiados intentos fallidos. Intenta más tarde';
                break;
            default:
                console.error(err);
                error.value = 'Error al iniciar sesión';
                break;
        }
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.contenedor {
    max-width: 500px;
    width: 500px;
    margin: 0 auto;
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
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

}

.grupo {
    display: flex;
    flex-direction: column;
    color: black;
    align-items: flex-start;
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
    background-color: #7a0796;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
    width: 100%;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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

.registro {
    text-align: center;
    color: #7a0796;
}
</style>