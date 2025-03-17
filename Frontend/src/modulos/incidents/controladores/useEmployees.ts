import {ref} from 'vue';

import employee from '../api/employees';
import type {Employee} from '../interface/employees-interface';

export const useTechEmployees = () => {
    const techemployees = ref<Employee[]>([]);

    const getTechEmployees = async () => {
        const response = await employee.get<Employee[]>('');
        techemployees.value = response.data
        console.log(response.data)
    }

    return {
        techemployees,
        getTechEmployees
    }
}
