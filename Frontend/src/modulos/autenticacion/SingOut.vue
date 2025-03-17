<template>
    <div class="contenedor">
      <form class="formulario" @submit.prevent="register">
        <section class="logo-tec">
          <img src="../../img/LOGO_TEC_PNG_OK.png" alt="Instituto Tecnológico de Culiacán">
        </section>
        <h2>Registro de Usuario</h2>
        
        <div class="grupo">
          <label>Correo</label>
          <input type="email" required v-model="email">
        </div>
        <div class="grupo">
          <label>Contraseña</label>
          <input type="password" required v-model="password" minlength="6">
        </div>
        <div class="grupo">
          <label>Confirmar Contraseña</label>
          <input type="password" required v-model="confirmPassword" minlength="6">
        </div>
        <div class="error" v-if="error">
          {{ error }}
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Registrando...' : 'Registrarse' }}
        </button>
        <p class="login">
          ¿Ya tienes cuenta? <router-link to="/validacion">Inicia sesión</router-link>
        </p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { getFirestore, doc, setDoc,getDoc } from 'firebase/firestore';
    import "../../firebase/config.js";
    
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const error = ref<string | null>(null);
    const loading = ref(false);
    const router = useRouter();
    
    const register = async () => {
        error.value = null;
        loading.value = true;
    
        // Validación de contraseñas
        if (password.value !== confirmPassword.value) {
        error.value = 'Las contraseñas no coinciden';
        loading.value = false;
        return;
        }
    
        try {
            const auth = getAuth();
            console.log(auth);
            console.log(email.value);
            console.log(password.value);
            const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );
        const user = userCredential.user;
        console.log(user);
        // Guardar información adicional en Firestore
        // Utilizamos el UID como ID del documento
        const db = getFirestore();
        console.log(userCredential);
        console.log(user.uid);
        console.log(db.app.name);
        const usuariosRef = doc(db, 'usuarios', user.uid);
        const usuariosSnapshot = await setDoc(doc(db, 'usuarios', 'metadata'), {}, { merge: true });
        const metadataRef = doc(db, 'usuarios', 'metadata');
        const metadataSnapshot = await getDoc(metadataRef);

        let rol = 'usuario';
        if (!metadataSnapshot.exists() || !metadataSnapshot.data().adminCreated) {
            rol = 'admin';
            await setDoc(metadataRef, { adminCreated: true }, { merge: true });
        }

        await setDoc(usuariosRef, {
            Correo: user.email,
            Rol: rol,
            Activo: true,
            Uid: user.uid,
            UltimoLogin: new Date()
        });
    
        // Redirigir al usuario a la página de inicio
        router.push({ name: 'validacion' });
        } catch (err: any) {
        switch (err.code) {
            case 'auth/email-already-in-use':
            error.value = 'Este correo ya está registrado';
            break;
            case 'auth/invalid-email':
            error.value = 'Correo electrónico inválido';
            break;
            case 'auth/weak-password':
            error.value = 'La contraseña debe tener al menos 6 caracteres';
            break;
            default:
            console.error(err);
            error.value = 'Error al registrar usuario';
            break;
        }
        } finally {
        loading.value = false;
        }
    };
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

    .login {
        text-align: center;
        color: #7a0796;
    }
</style>