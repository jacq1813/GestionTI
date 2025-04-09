<template>
    <div class="Container">
        <TopBar />

        <div class="Cont">
            <h2>Dispositivos</h2>

            <div class="btn-group">
                <button class="btn btn-regresar" @click="home" title="Volver al inicio">
                    <i class="fa fa-arrow-left"></i> Regresar
                </button>
                <button class="btn btn-anadir" @click="addDevice" v-if="rol === 'admin'" title="Añadir dispositivo">
                    <i class="fa fa-plus"></i> Añadir
                </button>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>ID Dispositivo</th>
                        <th>Nombre del Dispositivo</th>
                        <th>Fecha de Última Modificación</th>
                        <th>Versión</th>
                        <th>Fecha de Instalación</th>
                        <th>Tipo de Equipo</th>
                        <th>Aula</th>
                        <th>Componentes</th>
                        <th v-if="rol == 'admin'">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="device in devices" :key="device.ID_Equip">
                        <td>{{ device.ID_Equip }}</td>
                        <td>{{ device.Nombre }}</td>
                        <td>{{ device.Fecha_Ult_Mod }}</td>
                        <td>{{ device.Version }}</td>
                        <td>{{ device.Fecha_Inst }}</td>
                        <td>{{ device.TipoEquipo_Nombre }}</td>
                        <td>{{ device.Aula_Nombre }}</td>
                        <td>
                            <div v-if="device.Componentes_Nombres">
                                <button class="btn btn-info btn-sm" @click="viewComponents(device)">
                                    Ver Componentes
                                </button>
                            </div>
                            <span v-else>Sin componentes</span>
                        </td>
                        <td v-if="rol == 'admin'">
                            <button class="btn btn-primary btn-sm"><i class="fa fa-pencil"></i></button>
                            <button class="btn btn-danger btn-sm ml-1"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal for viewing components -->
        <div class="modal-overlay" v-show="showComponentsModal" @click.self="closeComponentsModal"
            :class="{ 'active': showComponentsModal }">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>Componentes del Dispositivo</h3>
                    <button class="close-btn" @click="closeComponentsModal">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Dispositivo:</strong> {{ selectedDeviceName }}</p>

                    <div v-if="selectedDeviceComponents.length > 0">
                        <table class="table table-sm table-bordered components-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha Última Mod.</th>
                                    <th>Versión</th>
                                    <th>Fecha Instalación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(component, index) in selectedDeviceComponents" :key="index">
                                    <td>{{ component.nombre }}</td>
                                    <td>{{ component.fechaUltMod || '-' }}</td>
                                    <td>{{ component.version || '-' }}</td>
                                    <td>{{ component.fechaInst || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="no-components">
                        <p>Este dispositivo no tiene componentes registrados.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeComponentsModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDevice } from '../controladores/useDevice';
import { useRouter } from 'vue-router';
import TopBar from '../layouts/TopBar.vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const { devices, getDevicesDetail } = useDevice();
const router = useRouter();
const rol = ref('');

// Modal state for components
const showComponentsModal = ref(false);
const selectedDeviceName = ref<string>('');
const selectedDeviceComponents = ref<any[]>([]);

onMounted(async () => {
    await getDevicesDetail();

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            rol.value = userData.Rol;
        }
    }
});

// Function to open the components modal
const viewComponents = (device: any) => {
    selectedDeviceName.value = device.Nombre;

    // Parse component data
    if (device.Componentes_Nombres) {
        const nombres = device.Componentes_Nombres.split(',').map((n: string) => n.trim());
        const fechasUltMod = device.Componentes_Fecha_Ult_Mod?.split(',').map((f: string) => f.trim()) || [];
        const versiones = device.Componentes_Version?.split(',').map((v: string) => v.trim()) || [];
        const fechasInst = device.Componentes_Fecha_Inst?.split(',').map((f: string) => f.trim()) || [];

        selectedDeviceComponents.value = nombres.map((nombre: string, index: number) => ({
            nombre,
            fechaUltMod: fechasUltMod[index] || null,
            version: versiones[index] || null,
            fechaInst: fechasInst[index] || null
        }));
    } else {
        selectedDeviceComponents.value = [];
    }

    showComponentsModal.value = true;
};

// Function to close the components modal
const closeComponentsModal = () => {
    showComponentsModal.value = false;
    selectedDeviceName.value = '';
    selectedDeviceComponents.value = [];
};

const home = () => {
    if (rol.value === 'admin') {
        router.push({ name: 'InicioAdmin' });
    } else {
        router.push({ name: 'Inicio' });
    }
};

const addDevice = () => {
    router.push({ name: 'InsertaEquipo' });
};
</script>

<style scoped>
.container {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    background-color: #f4f6fa;
    color: #333;
}

.Cont {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin: 2em 3em;
    align-self: center;
}

h2 {
    text-align: center;
    font-size: 2em;
    color: #4a4a4a;
    padding-bottom: 0.5em;
    border-bottom: 2px solid #daadff;
}

.btn-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5em;
    flex-wrap: wrap;
}

.btn {
    padding: 0.8em 1.4em;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    display: flex;
    align-items: center;
    gap: 0.6em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn i {
    font-size: 1.1em;
}

.btn-regresar {
    background-color: #6c757d;
    color: white;
}

.btn-regresar:hover {
    background-color: #5a6268;
}

.btn-anadir {
    background-color: #6f42c1;
    color: white;
}

.btn-anadir:hover {
    background-color: #5a32a3;
}

.table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95em;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

th,
td {
    padding: 14px 18px;
    text-align: left;
    border: 1px solid #ddd;
}

th {
    background-color: #daadff;
    color: white;
    font-weight: 600;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #eef0f4;
}

.btn-sm {
    padding: 0.4em 0.8em;
    font-size: 0.9em;
}

.btn-info {
    background-color: #17a2b8;
    color: white;
}

.btn-info:hover {
    background-color: #138496;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0069d9;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

.ml-1 {
    margin-left: 6px;
}

/* Modal styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 650px;
    max-width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: scale(0.95);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-overlay.active .modal-content {
    transform: scale(1);
    opacity: 1;
}

.modal-header {
    background-color: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
    margin: 0;
    color: #4a4a4a;
    font-size: 1.3em;
}

.modal-body {
    padding: 20px;
}

.modal-footer {
    padding: 15px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid #e0e0e0;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    color: #6c757d;
    cursor: pointer;
    transition: color 0.2s ease;
}

.close-btn:hover {
    color: #343a40;
}

.components-table {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
}

.components-table th {
    background-color: #daadff;
    color: white;
    font-weight: 600;
    text-align: left;
    padding: 10px;
}

.components-table td {
    padding: 8px 10px;
    border: 1px solid #e0e0e0;
}

.components-table tr:hover {
    background-color: #f5f5f5;
}

.no-components {
    text-align: center;
    color: #6c757d;
    margin: 20px 0;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>