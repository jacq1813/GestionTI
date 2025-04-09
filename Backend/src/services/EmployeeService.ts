import { EmployeeNew } from '../typesEmployee'

const connection = require('../connection/conec');

//obtener todos los empleados
export const getEmployees = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM empleado');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los empleados" };
    }
}

//obtener todos los empleados y sus puestos
export const getEmployeesPosition = async () => {
    try {
        const [rows] = await connection.query(`SELECT e.ID_Emp,e.Nombre,e.ApellidoPat,e.ApellidoMat,e.Num_tel, te.Nombre as 'Puesto', e.Calificacion, e.Correo FROM empleado e inner join tipoempleado te on e.ID_TipEmp = te.ID_TipEmp`);
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los empleados" };
    }
}

//obtener los empleados que son tecnicos
export const getTechEmployees = async () => {
    try {
        const [rows] = await connection.query(`SELECT e.ID_Emp,e.Nombre,e.ApellidoPat,e.ApellidoMat,e.Num_tel, te.Nombre as 'Puesto' FROM empleado e inner join tipoempleado te on e.ID_TipEmp = te.ID_TipEmp where te.ID_TipEmp = 3`);
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los empleados tecnicos" };
    }
}

//agregar un empleado
export const addEmployee = async (employee: EmployeeNew) => {
    try {
        const [rows] = await connection.query('INSERT INTO empleado (Nombre,ApellidoPat,ApellidoMat,Num_tel,ID_TipEmp,Calificacion,Correo,Contrasena) values (?,?,?,?,?,?,?,?)', [employee.Nombre,employee.ApellidoPat,employee.ApellidoMat,employee.Num_tel,employee.ID_TipEmp,employee.Calificacion,employee.Correo,employee.Contrasena]);
        return rows;
    } catch (error) {
        return { error: "no se pudo agregar el empleado" };
    }
}
//obtener un empleado por id
export const getEmployeeById = async (id: number) => {
    try {
        const [rows] = await connection.query('SELECT * FROM empleado WHERE ID_Emp = ?', [id]);
        return rows[0];
    } catch (error) {
        return { error: "no se pudo obtener el empleado" };
    }
}
//actualizar un empleado por id
export const updateEmployee = async (id: number, employee: any) => {
    try {
        const [rows] = await connection.query('UPDATE empleado SET ? WHERE ID_Emp = ?', [employee, id]);
        return rows;
    } catch (error) {
        return { error: "no se pudo actualizar el empleado" };
    }
}
//eliminar un empleado por id
export const deleteEmployee = async (id: number) => {
    try {
        const [rows] = await connection.query('DELETE FROM empleado WHERE ID_Emp = ?', [id]);
        return rows;
    } catch (error) {
        return { error: "no se pudo eliminar el empleado" };
    }
}