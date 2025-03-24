<template>
    <div class="Container">
        <TopBar></TopBar>

        <div class="Cont">
            <h2>Dispositivos</h2>

            <div class="classboton">
                <button class="btn btn-secondary" @click="home">Regresar</button>
                <button class="btn btn-secondary" @click="addDevice">Añadir</button>
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
                        <th>Acciones</th>
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
                                <button class="btn btn-info btn-sm" @click="toggleComponentes(device.ID_Equip)">
                                    {{ expandedDevices.includes(device.ID_Equip) ? 'Ocultar' : 'Ver' }} Componentes
                                </button>

                                <div v-if="expandedDevices.includes(device.ID_Equip)" class="componentes-lista mt-2">
                                    <table class="table table-sm table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Fecha Última Mod.</th>
                                                <th>Versión</th>
                                                <th>Fecha Instalación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(nombre, index) in device.Componentes_Nombres.split(',')"
                                                :key="index">
                                                <td>{{ nombre.trim() }}</td>
                                                <td>{{ device.Componentes_Fecha_Ult_Mod?.split(',')[index]?.trim() || '-' }}
                                                </td>
                                                <td>{{ device.Componentes_Version?.split(',')[index]?.trim() || '-' }}</td>
                                                <td>{{ device.Componentes_Fecha_Inst?.split(',')[index]?.trim() || '-' }}
                                                </td>
                                            </tr>
                                        </tbody>x
                                    </table>
                                </div>
                            </div>
                            <span v-else>Sin componentes</span>
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm">Editar</button>
                            <button class="btn btn-danger btn-sm ml-1">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDevice } from '../controladores/useDevice'; // Importa el hook useDevice
import { useRouter } from 'vue-router';
import TopBar from '../layouts/TopBar.vue'

const { devices, getDevicesDetail } = useDevice(); // Usa el hook para obtener dispositivos
const router = useRouter();
const expandedDevices = ref<number[]>([]);

onMounted(async() => {
    await getDevicesDetail(); // Obtén los dispositivos al montar el componente
});

const toggleComponentes = (deviceId: number) => {
    if (expandedDevices.value.includes(deviceId)) {
        expandedDevices.value = expandedDevices.value.filter(id => id !== deviceId);
    } else {
        expandedDevices.value.push(deviceId);
    }
};

const home = () => {
    router.push({ name: 'Inicio' }); // Redirige al inicio
};

const addDevice = () => {
    router.push({ name: 'InsertaEquipo' }); // Redirige al inicio
};
</script>
  
<style scoped>
.container {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    color: black;
}

.Cont {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 2em 3em;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
    padding: 1em;
    color: #333;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1em;
    border-radius: 8px;
    overflow: hidden;
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 14px;
}

th {
    background-color: #daadff;
    color: white;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

.componentes-lista {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
}

.ml-1 {
    margin-left: 5px;
}

.mt-2 {
    margin-top: 10px;
}
</style>