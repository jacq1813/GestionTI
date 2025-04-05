import {ref} from 'vue';

import incidentsApi from '../api/incidents';
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

    const getIncidentsByFolio = async (folio: string) => {
        try {
            const response = await incidentsApi.get<Incident>(`/recandemi/` + folio);
            return response.data; // Deberías retornar un solo objeto, no un arreglo
        } catch (error) {
            console.error(error);
            return { error: "No se pudo obtener la incidencia" };
        }
    }
    
    // asignar prioridad y tecnico a la incidencia
    const updateIncident = async (folio: string, Prioridad: string, ID_Rec: number) => {
        try {
            const response = await incidentsApi.put<Incident>(`/${folio}`, { Prioridad, ID_Rec });
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo actualizar la incidencia" };
        }
    }

    // actualizar estado de la incidencia
    const updateEstadoIncident = async (folio: string, estado: string) => {
        try {
            const response = await incidentsApi.put<Incident>(`/estado/${folio}`, { estado });
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo actualizar el estado de la incidencia" };
        }
    }

    return {
        incidents,
        getIncidents,
        getIncidentsRecandEmi,
        getIncidentsByEstado,
        getIncidentsByEstadoPeriodoAnio,
        getIncidentsByFolio,
        updateIncident,
        updateEstadoIncident
    }
}