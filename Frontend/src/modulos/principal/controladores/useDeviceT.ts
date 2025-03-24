import { ref } from 'vue';

import deviceT from '../api/deviceT';

import type { DeviceT, DeviceTNew } from '../interface/interface-deviceT';

export const useDeviceT = () => {
    const devicesT = ref<DeviceT[]>([]);

    const getDeviceT = async () => {
        const response = await deviceT.get<DeviceT[]>('');
        devicesT.value = response.data
        console.log(response.data)
    }

    const addDeviceT = async (DeviceT: DeviceTNew) => {
        try {
            console.log(DeviceT)
            const response = await deviceT.post<DeviceT>('/', DeviceT);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el dispositivo" };
        }
    }

    return {
        devicesT,
        getDeviceT,
        addDeviceT
    }
}