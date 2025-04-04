import { ref } from 'vue'

import employeesApi from '../api/employee'
import type { Employee,NewEmployee } from '../interface/interface-employee'

export const useEmployees = () => {
    const employees = ref<Employee[]>([]);

    //obtener todos los empleados
    const getEmployees = async () => {
        const response = await employeesApi.get<Employee[]>('')
        employees.value = response.data
    } 

    //obtener los empleados que son tecnicos
    const getTechEmployees = async () => {
        const response = await employeesApi.get<Employee[]>('/tech')
        employees.value = response.data
    }

    //agregar un empleado
    const addEmployee = async (employee: NewEmployee) => {
        try {
            const response = await employeesApi.post<NewEmployee>('/', employee);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo agregar el empleado" };
        }
    }

    //obtener un empleado por id
    const getEmployeeById = async (id: number) => {
        try {
            const response = await employeesApi.get<Employee>(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo obtener el empleado" };
        }
    }

    //actualizar un empleado por id
    const updateEmployee = async (id: number, employee: Employee) => {
        try {
            const response = await employeesApi.put<Employee>(`/${id}`, employee);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo actualizar el empleado" };
        }
    }

    //eliminar un empleado por id
    const deleteEmployee = async (id: number) => {
        try {
            const response = await employeesApi.delete<Employee>(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return { error: "No se pudo eliminar el empleado" };
        }
    }

    return{
        employees,
        getEmployees,
        getTechEmployees,
        addEmployee,
        getEmployeeById,
        updateEmployee,
        deleteEmployee
    }
}