import {ref} from 'vue';

import problem from '../api/problemas';

import type {Problemas, NewProblemas} from '../interface/interface-problemas';

export const useProblemas = () => {
    const problemas = ref<Problemas[]>([]);

    const getProblemas = async () => {
        const response = await problem.get<Problemas[]>('');
        problemas.value = response.data
        console.log(response.data)
    }

    const getProblemasDetalles = async () => {
        const response = await problem.get<Problemas[]>('/details');
        problemas.value = response.data
        console.log(response.data)
    }

    const getProblemaById = async (id: number) => {
        const response = await problem.get<Problemas>(`/${id}`);
        console.log(response.data)
        return response.data
    }

    const getProblemaByFolio = async (folio: number) => {
        const response = await problem.get<Problemas>(`/${folio}`);
        console.log(response.data)
        return response.data
    }

    const addProblemas = async (Problemas: NewProblemas) => {
        try {
            console.log(Problemas)
            const response = await problem.post<Problemas>('/', Problemas);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el problema" };
        }
    }

    return {
        problemas,
        getProblemas,
        addProblemas,
        getProblemasDetalles,
        getProblemaById,
        getProblemaByFolio
    }
}