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

//obtener todas las incidencias
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

//obtener todas las incidencias por el estado del proceso
export const getIncidentsByEstado = async (estado: string) => {
    try {
        const [rows] = await connection.query(
            `SELECT i.Folio,i.Descripcion,i.Fecha,i.Periodo, i.Estado,i.Hora,a.Nombre as 'Aula' , ta.Nombre as 'Tipo Aula', E.Nombre AS  'Emisor', te.Nombre as 'Puesto Emisor', e2.Nombre as 'Receptor',te2.Nombre as 'Puesto Receptor' FROM incidencia i 
             inner join empleado e on i.ID_Emi = e.ID_Emp
             inner join empleado e2 on e2.ID_Emp = i.ID_Rec
             inner join aula a on i.ID_Aula = a.ID_Aul 
             inner join tipoaula ta on ta.ID_TipoAula = a.ID_TipoAula
             inner join tipoempleado te on te.ID_TipEmp = e.ID_TipEmp
             inner join tipoempleado te2 on te2.ID_TipEmp = e2.ID_TipEmp
             WHERE i.Estado = ?
             ORDER BY Folio`,
            [estado]
        );
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las incidencias" };
    }
}
//obtener todas las incidencias por estado, periodo y año

export const getIncidentsByEstadoPeriodoAnio = async (estado: string, periodo: string, anio: string) => {
    try {
        // Expresión regular para extraer solo "Enero - Junio", "Verano" o "Agosto - Diciembre"
        const match = periodo.match(/(Enero - Junio|Verano|Agosto - Diciembre)/);
        const filteredPeriodo = match ? `${match[0]} ${anio}` : '';
        const [rows] = await connection.query(
            `SELECT i.Folio, i.Descripcion, i.Fecha, i.Periodo, i.Estado, i.Hora,
                    a.Nombre AS 'Aula', ta.Nombre AS 'Tipo Aula', 
                    E.Nombre AS 'Emisor', te.Nombre AS 'Puesto Emisor',
                    e2.Nombre AS 'Receptor', te2.Nombre AS 'Puesto Receptor'
             FROM incidencia i 
             INNER JOIN empleado e ON i.ID_Emi = e.ID_Emp
             INNER JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
             INNER JOIN aula a ON i.ID_Aula = a.ID_Aul 
             INNER JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula
             INNER JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
             INNER JOIN tipoempleado te2 ON te2.ID_TipEmp = e2.ID_TipEmp
             WHERE i.Estado = ? AND i.Periodo = ? AND YEAR(i.Fecha) = ?
             ORDER BY Folio`,
            [estado, filteredPeriodo, anio]
        );

        return rows;
    } catch (error) {
        return { error: "No se pudo obtener las incidencias" };
    }
};
