import { ref } from 'vue'

import employeesApi from '../api/employee'
import type { Employee } from '../interface/interface-employee'

export const useEmployees = () => {
    const employees = ref<Employee[]>([]);

    const getEmployees = async () => {
        const response = await employeesApi.get<Employee[]>('')
        employees.value = response.data
    } 

    const getTechEmployees = async () => {
        const response = await employeesApi.get<Employee[]>('/tech')
        employees.value = response.data
    }

    return{
        employees,
        getEmployees,
        getTechEmployees
    }
}