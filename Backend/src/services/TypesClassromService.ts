
const connection = require('../connection/conec');


export const getTipoAulas = async () => {
    try {
        const [rows] = await connection.query("SELECT * FROM TipoAula");
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener los tipos de aula"}
    }
};