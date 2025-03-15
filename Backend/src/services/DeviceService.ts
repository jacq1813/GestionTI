

const connection = require('../connection/conec');

//obtener todos los equipos
export const getDevices = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM equipo');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los equipos" };
    }
}