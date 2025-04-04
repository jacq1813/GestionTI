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
                    <th>Telefono</th>
                    <th>Tipo Empleado</th>
                    <th>Calificación</th>
                    <th>Descripcion</th>
                    <th>Asignar Rol</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="employees.length == 0">
                    <td class="centrado" colspan="7">Sin personal registrado</td>
                </tr>
                <tr v-else v-for="(employees, index) in employees" :key="employees.ID_Emp">
                    <td>{{ employees.ID_Emp }}</td>
                    <td>{{ employees.Nombre + ' ' + employees.ApellidoPat + ' ' + employees.ApellidoMat }}</td>
                    <td>{{ employees.Num_tel }}</td>
                    <td>{{ employees.ID_TipEmp }}</td>
                    <td>{{ employees.Calificacion }}</td>
                    <td>{{ employees.Correo }}</td>
                    <td>
                        <button @click="assignRole(employees.Nombre+' '+employees.ApellidoPat+' '+employees.ApellidoMat,employees.ID_Emp,employees.Correo,employees.Contrasena)" class="btn btn-primary">Asignar rol</button>
                    </td>
                    
                </tr>
            </tbody>
        </table>

        <div class="modal-overlay" v-show="showModal" @click.self="closeModal" :class="{'active': showModal }">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>Asignar Rol al Empleado</h3>
                    <button class="close-btn" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Empleado: {{ selectedEmployeeName }}</p>
                    <p>Correo: {{ selectedCorreo }}</p>
                    <div class="form-group">
                        <label for="roleSelect">Seleccione Rol:</label>
                        <select v-model="selectedRole" id="roleSelect" class="form-control">
                            <option value="" disabled selected>Seleccione un rol</option>
                            <option v-for="role in roles" :key="role.NombreRol" :value="role.NombreRol">
                                {{ role.NombreRol }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
                <button class="btn btn-primary" @click="confirmAssignRole">Asignar</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useEmployees } from '../controladores/useEmployee'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc,getDoc,updateDoc,collection,getDocs } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import type { Employee } from '../interface/interface-employee'
import TopBar from '../layouts/TopBar.vue'

const { employees, getEmployees, getTechEmployees } = useEmployees()
const router = useRouter()
const db = getFirestore()

//Estado para el modal
const showModal = ref(false)
const selectedEmployeeName = ref<string | null>(null)
const selectedEmployee = ref<number | null>(null)
const selectedCorreo = ref<string | null>(null)
const selectedRole = ref<number | null>(null)
const selectedContrasena = ref<string | null>(null)

//Roles disponibles
const roles = ref([
    { ID_Rol: 1, NombreRol: 'Jefe de taller' },
    { ID_Rol: 2, NombreRol: 'Tecnico' },
    { ID_Rol: 3, NombreRol: 'Usuario' },
    { ID_Rol: 4, NombreRol: 'Secretaria'},
])

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

//abrir modal
const assignRole = async (Nombre:string,id: number,correo: string,contrasena:string) => {
    selectedEmployeeName.value = Nombre
    selectedEmployee.value = id
    selectedCorreo.value = correo
    selectedContrasena.value = contrasena
    showModal.value = true
}

//cerrar modal
const closeModal = () => {
    showModal.value = false
    selectedEmployee.value = null
    selectedRole.value = null
}
// Asignar el rol en Firestore
const confirmAssignRole = async () => {
    if (!selectedRole.value || !selectedEmployee.value) {
        alert('Seleccione un rol y un empleado');
        return;
    }

    try {
        const userRef = doc(collection(db, 'usuarios'));
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // Actualizar usuario existente
            await updateDoc(userRef, {
                Rol: selectedRole.value,
                ID_Emp: selectedEmployee.value,
                UltimoLogin: new Date(),
            });
            alert('Rol asignado correctamente');
        } else {
            // Crear nuevo usuario si no existe
            if (selectedCorreo.value && selectedContrasena.value) {
                const auth = getAuth();
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, selectedCorreo.value, selectedContrasena.value);
                    const user = userCredential.user;

                    await setDoc(userRef, {
                        Uid: user.uid,
                        Correo: selectedCorreo.value,
                        Rol: selectedRole.value,
                        Activo: true,
                        ID_Emp: selectedEmployee.value,
                        UltimoLogin: new Date(),
                    });

                    alert('Usuario creado y rol asignado correctamente');
                } catch (err: any) {
                    handleAuthError(err);
                }
            } else {
                alert('Correo o contraseña no proporcionados');
            }
        }
    } catch (error) {
        console.error('Error al asignar rol:', error);
        alert('Ocurrió un error al asignar el rol');
    } finally {
        closeModal();
    }
};

// Manejar errores de autenticación
const handleAuthError = (err: any) => {
    switch (err.code) {
        case 'auth/email-already-in-use':
            alert('El correo ya está en uso');
            break;
        case 'auth/invalid-email':
            alert('Correo electrónico inválido');
            break;
        case 'auth/weak-password':
            alert('La contraseña es demasiado débil');
            break;
        default:
            alert('Error al crear el usuario: ' + err.message);
            break;
    }
};

const getUsersFromFireStore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const userList = querySnapshot.docs.map(doc => ({
            ID_Emp: doc.data().ID_Emp,
            Nombre: doc.data().Nombre,
            ApellidoPat: doc.data().ApellidoPat,
            ApellidoMat: doc.data().ApellidoMat,
            Num_tel: doc.data().Num_tel,
            ID_TipEmp: doc.data().ID_TipEmp,
            Calificacion: doc.data().Calificacion,
            Correo: doc.data().Correo
        }));
        employees.value = userList as Employee[]
    } catch (error) {
        console.error("Error al obtener usuarios de Firestore: ", error);
    }
}

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

/* Estilos para el modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;  /* Transición solo para el fondo */
    pointer-events: auto;
}

/* .model-overlay.active{
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
} */





/*que aparezca poco a poco el modal */


.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(0.8);  /* Comienza ligeramente más pequeño */
    opacity: 1;  /* Comienza invisible */
    transition: transform 0.3s ease, opacity 1s ease;  /* Transición para escala y opacidad */
    color: black;
    pointer-events: auto;
}
/* 
.modal-content.active {
    transform: scale(1);  /* Escala normal al abrir 
    opacity: 1;  /* Totalmente visible al abrir 
    pointer-events: auto;  /* Permitir interacciones 
} */

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    margin: 0 auto;
}

.modal-body {
    padding: 16px;
}

.modal-footer {
    padding: 12px 16px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid #e0e0e0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>