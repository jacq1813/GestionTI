import { ref } from 'vue';

import log from '../api/log';

import type { Log, LogNew, LogD } from '../interface/interface-log';

export const useLog = () => {
    const logs = ref<Log[]>([]);
    const logsD = ref<LogD[]>([]);


    const getLog = async () => {
        const response = await log.get<Log[]>('');
        logs.value = response.data
        console.log(response.data)
    }

    const getLogDetails = async () => {
        const response = await log.get<LogD[]>('det');
        logsD.value = response.data
        console.log(response.data)
    }

    const getLogById = async (id: number) => {
        const response = await log.get<LogD>(`${id}`);
        logsD.value = [response.data];
        console.log(response.data);
        return response.data; 
    };
    

    const addLog = async (logData: LogNew) => {
        try {
            console.log("hola")
            console.log(logData)
            const response = await log.post<Log>('/', logData);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(logData)
            console.error(error);
            return { error: "No se pudo agregar el log" };
        }
    }

    return {
        logs,
        logsD,
        getLog,
        addLog,
        getLogDetails,
        getLogById
    }
}