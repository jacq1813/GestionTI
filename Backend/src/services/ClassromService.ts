

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