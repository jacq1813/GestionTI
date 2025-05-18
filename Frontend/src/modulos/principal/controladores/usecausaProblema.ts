import {ref} from 'vue';

import causaProblema from '../api/causaProblema';
import type {CauseProblem, NewCauseProblem} from '../interface/interface-causaProblemas';

export const useCausaProblema = () => {
    const causasProblemas = ref<CauseProblem[]>([]);

    const getCausaProblema = async () => {
        const response = await causaProblema.get<CauseProblem[]>('');
        causasProblemas.value = response.data
        console.log("causasProblemas.value")
        console.log(causasProblemas.value)
        console.log("aqui es causas ")
        console.log(response.data)
    }

    const addCausaProblema = async (CausaProblema: NewCauseProblem) => {
        console.log("aqui es causas ")
        console.log(CausaProblema)
        try {
            console.log(CausaProblema)
            const response = await causaProblema.post<CauseProblem>('/', CausaProblema);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar la causa del problema" };
        }
    }

    const updateCausaProblema = async (id: number, CausaProblema: CauseProblem) => {
        try {
            const response = await causaProblema.put<CauseProblem>(`/${id}`, CausaProblema);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo actualizar la causa del problema" };
        }
    }

    const deleteCausaProblema = async (id: number) => {
        try {
            const response = await causaProblema.delete<CauseProblem>(`/${id}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo eliminar la causa del problema" };
        }
    }

    return {
        causasProblemas,
        getCausaProblema,
        addCausaProblema,
        updateCausaProblema,
        deleteCausaProblema
    }
}