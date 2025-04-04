<template>
    <div class="contenedor">
      <form class="formulario" @submit.prevent="register">
        <section class="logo-tec">
          <img src="../../img/LOGO_TEC_PNG_OK.png" alt="Instituto Tecnológico de Culiacán">
        </section>
        <h2>Registro de Usuario</h2>
        <div class="grupo">
          <label>Nombre</label>
          <input type="text" required v-model="user.nombre" minlength="5" maxlength="50">
        </div>
        <div class="grupo">
          <label>Apellido Paterno</label>
          <input type="text" required v-model="user.apellidoPaterno" minlength="5" maxlength="50">
        </div>
        <div class="grupo">
          <label>Apellido Materno</label>
          <input type="text" required v-model="user.apellidoMaterno" minlength="5" maxlength="50">
        </div>
        <div class="grupo">
          <label>Teléfono</label>
          <input type="tel" required v-model="user.telefono" minlength="10" maxlength="10">
        </div>
        <div class="grupo">
          <label>Correo</label>
          <input type="email" required v-model="user.email">
        </div>
        <div class="grupo">
          <label>Contraseña</label>
          <input type="password" required v-model="user.password" minlength="6">
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
  import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
  import { useEmployees } from '../principal/controladores/useEmployee';
  import "../../firebase/config.js";


  const { employees,addEmployee } = useEmployees()
  const confirmPassword = ref('');
  const fecha_nacimineto = ref('');
  const user = ref({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    ID_TipEmp: 1,
    Calificaion: 0,
    email: '',
    password: '',
  });

  const error = ref<string | null>(null);
  const loading = ref(false);
  const router = useRouter();

  const register = async () => {
    error.value = null;
    loading.value = true;

    if (user.value.password !== confirmPassword.value) {
      error.value = 'Las contraseñas no coinciden';
      loading.value = false;
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.value.email,
        user.value.password
      );

      const db = getFirestore();
      const userId = userCredential.user.uid;
      const usuariosRef = doc(db, 'usuarios', userId);
      const metadataRef = doc(db, 'usuarios', 'metadata');
      const metadataSnapshot = await getDoc(metadataRef);

      const rol = metadataSnapshot.exists() && metadataSnapshot.data()?.adminCreated
        ? 'usuario'
        : 'admin';

      if (rol === 'admin') {
        await setDoc(metadataRef, { adminCreated: true }, { merge: true });
      }

      await setDoc(usuariosRef, {
        Correo: user.value.email,
        Rol: rol,
        Activo: true,
        Uid: userId,
        UltimoLogin: new Date(),
      });

      try {
          await addEmployee({
          Nombre: user.value.nombre,
          ApellidoPat: user.value.apellidoPaterno,
          ApellidoMat: user.value.apellidoMaterno,
          Num_tel: user.value.telefono,
          ID_TipEmp: user.value.ID_TipEmp,
          Calificacion: user.value.Calificaion,
          Correo: user.value.email,
          Contrasena: user.value.password,
      });
      } catch (error) {
          console.error('Error al agregar empleado:', error);
      }
      router.push({ name: 'validacion' });
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      loading.value = false;
    }
  };

  const handleAuthError = (err: any) => {
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
  };
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

    #fecha-nacimiento {
        display: flex;
        flex-direction: row;
        align-items:flex-start;
        justify-content: space-between;
        color: #7a0796;

    }
    #fecha-nacimiento input {
        width: 100%;
        padding: 6px;
        border: 1px solid #DDD;
        border-radius: 5px;
    }

    .grupo-min{
        display: flex;
        flex-direction: column;
        color: black;
        align-items:flex-start;
        justify-content: space-between;
    }

    .grupo-min-esp{
        display: flex;
        flex-direction: column;
        color: black;
        margin-top: 1em;
        width: 20%;
    }

    .fecha{
      text-align: center;
      color: #7a0796;
      margin: 0 auto;
      font-weight: bold;
    }

    .fecha-nac{
        color: #7a0796;
        font-weight: bold;
        font-size: .9em;
        align-self: center;
    }

</style>