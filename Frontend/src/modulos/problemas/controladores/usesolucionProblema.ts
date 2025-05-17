import {ref} from 'vue';

import solucionProblema from '../api/solucionProblema';

import type {SolveProblem, NewSolveProblem} from '../interface/interface-solucionProblemas';

export const useSolucionProblema = () => {
    const solucionProblemas = ref<SolveProblem[]>([]);

    const getSolucionProblemas = async () => {
        const response = await solucionProblema.get<SolveProblem[]>('');
        solucionProblemas.value = response.data
        console.log(response.data)
    }

    const getSolucionProblemaById = async (id: number) => {
        const response = await solucionProblema.get<SolveProblem>(`/${id}`);
        console.log(response.data)
        return response.data
    }

    const addSolucionProblema = async (nuevaSolucionProblema: NewSolveProblem) => {
        try {
            console.log(nuevaSolucionProblema)
            const response = await solucionProblema.post<SolveProblem>('/', nuevaSolucionProblema);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar la solución del problema" };
        }
    }

    const updateSolucionProblema = async (id: number, solucion: SolveProblem) => {
        try {
            const response = await solucionProblema.put<SolveProblem>(`/${id}`, solucion);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo actualizar la solución del problema" };
        }
    }

    const deleteSolucionProblema = async (id: number) => {
        try {
            const response = await solucionProblema.delete<SolveProblem>(`/${id}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo eliminar la solución del problema" };
        }
    }

    return {
        solucionProblemas,
        getSolucionProblemas,
        addSolucionProblema,
        updateSolucionProblema,
        deleteSolucionProblema,
        getSolucionProblemaById
    }
}