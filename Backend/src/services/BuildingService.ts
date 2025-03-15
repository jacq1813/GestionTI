

const connection = require('../connection/conec');

//obtener todos los edificios
export const getBuildings = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM edificio');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los edificios" };
    }
}
