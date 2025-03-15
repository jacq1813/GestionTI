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

export const getIncidentsRecandEmi = async () => {
    try {
        const [rows] = await connection.query(`SELECT i.Folio,i.Descripcion,i.Fecha,i.Periodo, i.Estado,i.Hora,a.Nombre as 'Aula' , ta.Nombre as 'Tipo Aula', E.Nombre AS  'Emisor', te.Nombre as 'Puesto Emisor', e2.Nombre as 'Receptor',te2.Nombre as 'Puesto Receptor' FROM incidencia i 
                                                inner join empleado e on i.ID_Emi = e.ID_Emp
                                                inner join empleado e2 on e2.ID_Emp = i.ID_Rec
                                                inner join aula a on i.ID_Aula = a.ID_Aul 
                                                inner join tipoaula ta on ta.ID_TipoAula = a.ID_TipoAula
                                                inner join tipoempleado te on te.ID_TipEmp = e.ID_TipEmp
                                                inner join tipoempleado te2 on te2.ID_TipEmp = e2.ID_TipEmp
                                                ORDER BY Folio`);
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las incidencias" };
    }
}