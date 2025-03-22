

const connection = require('../connection/conec');

//obtener todos los edificios
export const getBuildings = async () => {
    try {
        const [rows] = await connection.query('SELECT e.*, td.Nombre AS Nombre_Departamento FROM Edificio e JOIN TipoDepartamento td ON e.ID_TipDpto = td.ID_TipDpto');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los edificios" };
    }
}


