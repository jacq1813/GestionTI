import {ref} from 'vue';

import incidentsApi from '../api/Incidents';
import type {Incident} from '../interface/interface-incidents';

export const useIncidents = () => {
    const incidents = ref<Incident[]>([]);

    const getIncidents = async () => {
        const response = await incidentsApi.get<Incident[]>('');
        incidents.value = response.data
        console.log(response.data)
    }

    const getIncidentsRecandEmi = async () => {
        const response = await incidentsApi.get<Incident[]>('/recandemi');
        incidents.value = response.data
        console.log(response.data)
    }

    const getIncidentsProceso = async () => {
        const response = await incidentsApi.get<Incident[]>('/proceso');
        incidents.value = response.data
        console.log(response.data)
    }

    const getIncidentsTerminada = async () => {
        const response = await incidentsApi.get<Incident[]>('/terminada');
        incidents.value = response.data
        console.log(response.data)
    }

    const getIncidentsLiberada = async () => {
        const response = await incidentsApi.get<Incident[]>('/liberada');
        incidents.value = response.data
        console.log(response.data)
    }

    const getIncidentsRechazada = async () => {
        const response = await incidentsApi.get<Incident[]>('/rechazada');
        incidents.value = response.data
        console.log(response.data)
    }
    

    return {
        incidents,
        getIncidents,
        getIncidentsRecandEmi,
        getIncidentsProceso,
        getIncidentsTerminada,
        getIncidentsLiberada,
        getIncidentsRechazada
    }
}