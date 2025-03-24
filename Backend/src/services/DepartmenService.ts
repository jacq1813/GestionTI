const connection = require('../connection/conec');

//obtener todos los departamentos
export const getDepartments = async () => {
    try {
        const [rows] = await connection.query('SELECT * FROM tipodepartamento');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los departamentos" };
    }
}
