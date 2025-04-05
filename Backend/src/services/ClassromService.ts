

import { ClassroomNew } from '../typesClassrom';
const connection = require('../connection/conec');

//obtener todos los salones
export const getClassrooms = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM aula');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los salones" };
    }
}

// obtener salones detallado
export const getClassroomsDetail = async () => {
    try {
        const [rows] = await connection.query('SELECT Aula.ID_Aul, Aula.Nombre, Edificio.Nombre AS Edificio_Nombre, TipoAula.Nombre AS TipoAula_Nombre, Empleado.Nombre AS Empleado_Nombre FROM Aula JOIN Edificio ON Aula.ID_Edif = Edificio.ID_Edif JOIN TipoAula ON Aula.ID_TipoAula = TipoAula.ID_TipoAula JOIN Empleado ON Aula.ID_Emp = Empleado.ID_Emp; ');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los salones" };
    }
}

// añadir un aula
export const addClassroom = async (classroom: ClassroomNew) => {
    try{
        const [rows] = await connection.query('INSERT INTO Aula (Nombre, ID_TipoAula, ID_Edif, ID_Emp) values (?,?,?,?)', [classroom.Nombre, classroom.ID_TipoAula, classroom.ID_Edif, classroom.ID_Emp]);
        return rows;
    }catch (error) {
        return { error: "no se pudo agregar el salon" };
    }
}