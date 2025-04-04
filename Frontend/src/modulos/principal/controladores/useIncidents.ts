import {ref} from 'vue';

import incidentsApi from '../api/Incidents';
import type {Incident, NewIncident} from '../interface/interface-incidents';

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

    const addIncidents = async (Incident: NewIncident) => {
        try {
            console.log(Incident)
            const response = await incidentsApi.post<Incident>('/', Incident);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar la incidencia" };
        }
    }


    return {
        incidents,
        getIncidents,
        getIncidentsRecandEmi,
        getIncidentsByEstado,
        getIncidentsByEstadoPeriodoAnio,
        addIncidents
    }
}