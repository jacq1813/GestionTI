import { ref } from 'vue';

import log from '../api/log';

import type { Log, LogNew } from '../interface/interface-log';

export const useLog = () => {
    const logs = ref<Log[]>([]);

    const getLog = async () => {
        const response = await log.get<Log[]>('');
        logs.value = response.data
        console.log(response.data)
    }

    const getLogDetails = async () => {
        const response = await log.get<Log[]>('det');
        logs.value = response.data
        console.log(response.data)
    }

    const getLogById = async (id: number) => {
        const response = await log.get<Log>(`${id}`);
        logs.value = [response.data]
        console.log(response.data)
    }

    const addLog = async (logData: LogNew) => {
        try {
            console.log(logData)
            const response = await log.post<Log>('/', logData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el log" };
        }
    }

    return {
        logs,
        getLog,
        addLog,
        getLogDetails,
        getLogById
    }
}