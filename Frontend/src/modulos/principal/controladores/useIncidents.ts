import {ref} from 'vue';

import incidentsApi from '../api/Incidents';
import type {Incident} from '../interface/interface-incidents';

export const useIncidents = () => {
    const incidents = ref<Incident[]>([]);

    const getIncidents = async () => {
        const response = await incidentsApi.get<Incident[]>('');
        incidents.value = response.data
    }

    const getIncidentsRecandEmi = async () => {
        const response = await incidentsApi.get<Incident[]>('/recandemi');
        incidents.value = response.data
    }

    const getIncidentsByEstado = async (estado: string) => {
        const response = await incidentsApi.get<Incident[]>(`/recandemi/`+estado);
        incidents.value = response.data
    }

    const getIncidentsByEstadoPeriodoAnio = async (estado: string, periodo: string, anio: string) => {
        const response = await incidentsApi.get<Incident[]>(`/recandemi/`+estado+`/`+periodo+`/`+anio);
        incidents.value = response.data
    }

    return {
        incidents,
        getIncidents,
        getIncidentsRecandEmi,
        getIncidentsByEstado,
        getIncidentsByEstadoPeriodoAnio
    }
}