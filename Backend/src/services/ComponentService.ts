

const connection = require('../connection/conec');

//obtener todos los componentes
export const getComponents = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM componente');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los componentes" };
    }
}