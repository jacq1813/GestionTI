// import { Incident } from "../typesIncident";
// import { incidentSchema } from "../schemas/incidentSchema";

const connection = require('../connection/conec');

export const getIncidents = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM incidencia');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener las incidencias" };
    }
}