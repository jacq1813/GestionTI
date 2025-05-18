import {ref} from 'vue';

import problem from '../api/problemas';

import type {Problems, ProblemsNew, ProblemsDetails} from '../interface/interface-problemas';


export const useProblemas = () => {
    const problemas = ref<Problems[]>([]);
    const problemasDetalles = ref<ProblemsDetails[]>([]);

    const getProblemas = async () => {
        const response = await problem.get<Problems[]>('');
        problemas.value = response.data
        console.log(response.data)
    }

    const getProblemasDetalles = async () => {
        const response = await problem.get<ProblemsDetails[]>('/details');
        problemasDetalles.value = response.data
        console.log("aqui es ")
        console.log(response.data)
    }

    const getProblemaById = async (id: number) => {
        const response = await problem.get<ProblemsDetails>(`/${id}`);
        problemasDetalles.value = [response.data]
        console.log("aqui es  BY ID")
        console.log(problemasDetalles)
        return response.data
    }

    const getProblemaByFolio = async (folio: number) => {
        const response = await problem.get<Problems>(`/${folio}`);
        console.log(response.data)
        return response.data
    }

    const addProblemas = async (Problemas: ProblemsNew) => {
        try {
            console.log(Problemas.Folio_Incidencia)
            const response = await problem.post<Problems>('/', Problemas);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el problema" };
        }
    }

    const updateProblema = async (problema: {
        ID_Emp: number;
        ID_Causa: number;
        ID_Solucion: number | null;
        Folio_Incidencia: string;
    }) => {
        try {
            const response = await problem.put(`/${problema.Folio_Incidencia}`, problema);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: 'No se pudo actualizar el problema' };
        }
    }

    const updateProblemaS = async (problema: {
        ID_Emp: number;
        ID_Solucion: number | null;
        Folio_Incidencia: string;
    }) => {
        try {
            const response = await problem.put(`/${problema.Folio_Incidencia}/solucion`, problema);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: 'No se pudo actualizar el problema' };
        }
    }
    

    return {
        problemas,
        problemasDetalles,
        updateProblema,
        getProblemas,
        updateProblemaS,
        addProblemas,
        getProblemasDetalles,
        getProblemaById,
        getProblemaByFolio
    }
}