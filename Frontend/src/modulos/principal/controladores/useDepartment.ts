import {ref} from 'vue';

import departmentApi from '../api/department';
import type {Department} from '../interface/interface-department';

export const useDepartment = () => {
    const departments = ref<Department[]>([]);

    const getDepartments = async () => {
        const response = await departmentApi.get<Department[]>('');
        departments.value = response.data
    }

    const getDepartmentById = async (id: number) => {
        try {
            const response = await departmentApi.get<Department>(`/` + id);
            return response.data; // Deberías retornar un solo objeto, no un arreglo
        } catch (error) {
            console.error(error);
            return { error: "No se pudo obtener el departamento" };
        }
    }
    

    return {
        departments,
        getDepartments,
        getDepartmentById
    }
}