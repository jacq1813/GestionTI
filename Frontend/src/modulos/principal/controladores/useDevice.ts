import { ref } from "vue";

import type { Device,NewDevice } from "../interface/interface-device";
import device from "../api/device";


export const useDevice = () => {
    const devices = ref<Device[]>([]);

    const getDevices = async () => {
        const response = await device.get<Device[]>('');
        devices.value = response.data
        console.log(response.data)
    }

    const getDevicesDetail = async () => {
        const response = await device.get<Device[]>('/Detail');
        devices.value = response.data
        console.log(response.data)
    }

    const addDevice = async (Device: NewDevice) => {
        try {
            console.log(Device)
            const response = await device.post<Device>('/', Device);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el dispositivo" };
        }
    }

    return {
        devices,
        getDevices,
        getDevicesDetail,
        addDevice
    }
}

