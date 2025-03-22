import { ref } from "vue";

import type { Device } from "../interface/interface-device";
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

    return {
        devices,
        getDevices,
        getDevicesDetail
    }
}

