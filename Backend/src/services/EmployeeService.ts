

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

//obtener los empleados que son tecnicos
export const getTechEmployees = async () => {
    try {
        const [rows] = await connection.query(`SELECT e.ID_Emp,e.Nombre,e.ApellidoPat,e.ApellidoMat,e.Fecha_Nac,e.Num_tel, te.Nombre as 'Puesto' FROM empleado e inner join tipoempleado te on e.ID_TipEmp = te.ID_TipEmp where te.ID_TipEmp = 3`);
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los empleados tecnicos" };
    }
}