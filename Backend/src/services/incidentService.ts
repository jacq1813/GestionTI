// import { Incident } from "../typesIncident";
// import { incidentSchema } from "../schemas/incidentSchema";

const connection = require('../connection/conec');

import { IncidentNew } from "../typesIncident";

export const getIncidents = async () => {
    try {
        const [rows] = await connection.query('SELECT * FROM incidencia');
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las incidencias" };
    }
}

/**
 * 
 * @returns 
 * Consulta anterior
 * //obtener todas las incidencias
export const getIncidentsRecandEmi = async () => {
    try {
        const [rows] = await connection.query(SELECT i.Folio,i.Descripcion,i.Fecha,i.Periodo, i.Estado,i.Hora,a.Nombre as 'Aula' , ta.Nombre as 'Tipo Aula', E.Nombre AS  'Emisor', te.Nombre as 'Puesto Emisor', e2.Nombre as 'Receptor',te2.Nombre as 'Puesto Receptor' FROM incidencia i 
                                                inner join empleado e on i.ID_Emi = e.ID_Emp
                                                inner join empleado e2 on e2.ID_Emp = i.ID_Rec
                                                inner join aula a on i.ID_Aula = a.ID_Aul 
                                                inner join tipoaula ta on ta.ID_TipoAula = a.ID_TipoAula
                                                inner join tipoempleado te on te.ID_TipEmp = e.ID_TipEmp
                                                inner join tipoempleado te2 on te2.ID_TipEmp = e2.ID_TipEmp
                                                ORDER BY Folio);
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las incidencias" };
    }
}

 */
//obtener todas las incidencias
export const getIncidentsRecandEmi = async () => {
    try {
        const [rows] = await connection.query(`        SELECT
        i.Folio,
        i.Descripcion,
        i.Fecha,
        p.Nombre as 'Periodo', 
        i.Estado,
        i.Hora,
        i.Prioridad,
        COALESCE(a.Nombre, 'Desconocido') AS 'Aula',
        COALESCE(ta.Nombre, 'Desconocido') AS 'Tipo Aula',
        COALESCE(E.Nombre, 'Desconocido') AS 'Emisor',
        COALESCE(te.Nombre, 'Desconocido') AS 'Puesto Emisor',
        COALESCE(e2.Nombre, 'Desconocido') AS 'Receptor',
        COALESCE(te2.Nombre, 'Desconocido') AS 'Puesto Receptor',
        eq.Nombre as 'TipoEquipo'
        FROM incidencia i 
        LEFT JOIN empleado e ON i.ID_Emi = e.ID_Emp
        LEFT JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
        LEFT JOIN aula a ON i.ID_Aula = a.ID_Aul 
        LEFT JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula
        LEFT JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
        LEFT JOIN tipoempleado te2 ON te2.ID_TipEmp = e2.ID_TipEmp
        LEFT JOIN periodos p ON p.ID_Periodo = i.ID_Periodo
        LEFT JOIN equipo eq ON eq.ID_Aul = a.ID_Aul
        LEFT JOIN tipoequipo teq ON teq.ID_TipEquipo = eq.ID_TipEquipo
        ORDER BY Folio
    `);
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las incidencias" };
    }
}

//obtener todas las incidencias por el estado del proceso
export const getIncidentsByEstado = async (estado: string) => {
    try {
        const [rows] = await connection.query(
            `SELECT i.Folio,i.Descripcion,i.Fecha,i.Periodo, i.Estado,i.Hora,a.Nombre as 'Aula' , ta.Nombre as 'Tipo Aula', E.Nombre AS  'Emisor', te.Nombre as 'Puesto Emisor', e2.Nombre as 'Receptor',te2.Nombre as 'Puesto Receptor',i.Prioridad FROM incidencia i 
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
        let IDPerido = 0;
        switch (periodo) {
            case 'Enero - Junio':
                IDPerido = 1;
                break;
            case 'Verano':
                IDPerido = 2;
                break;
            case 'Agosto - Diciembre':
                IDPerido = 3;
                break;
        }
        const [rows] = await connection.query(
            `        SELECT i.Folio, i.Descripcion, i.Fecha, p.Nombre as 'Periodo', i.Estado, i.Hora,
                    a.Nombre AS 'Aula', ta.Nombre AS 'Tipo Aula', 
                    E.Nombre AS 'Emisor', te.Nombre AS 'Puesto Emisor',
                    e2.Nombre AS 'Receptor', te2.Nombre AS 'Puesto Receptor',
                    eq.Nombre as 'TipoEquipo', i.Prioridad
                    FROM incidencia i 
                    LEFT JOIN empleado e ON i.ID_Emi = e.ID_Emp
                    LEFT JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
                    LEFT JOIN aula a ON i.ID_Aula = a.ID_Aul 
                    LEFT JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula
                    LEFT JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
                    LEFT JOIN tipoempleado te2 ON te2.ID_TipEmp = e2.ID_TipEmp
                    LEFT JOIN Periodos p ON p.ID_Periodo = i.ID_Periodo
                    LEFT JOIN equipo eq ON eq.ID_Aul = a.ID_Aul
                    LEFT JOIN tipoequipo teq ON teq.ID_TipEquipo = eq.ID_TipEquipo
                    WHERE i.Estado = ? AND i.ID_Periodo = ? AND YEAR(i.Fecha) = ?
                    ORDER BY Folio;`,
                    [estado, IDPerido, anio]
        );
        return rows;
    } catch (error) {
        return { error: "No se pudo obtener las incidencias" };
    }
}

//obtener todas las incidencias por folio
export const getIncidentsByFolio = async (folio: string) => {
    try {
        const [rows] = await connection.query(
            `SELECT i.Folio, i.Descripcion, i.Fecha, i.Periodo, i.Estado, i.Hora,
            a.Nombre AS 'Aula', ta.Nombre AS 'Tipo Aula', 
            E.Nombre AS 'Emisor', te.Nombre AS 'Puesto Emisor',
            e2.Nombre AS 'Receptor', te2.Nombre AS 'Puesto Receptor',
            eq.Nombre as 'TipoEquipo'
            FROM incidencia i 
            LEFT JOIN empleado e ON i.ID_Emi = e.ID_Emp
            LEFT JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
            LEFT JOIN aula a ON i.ID_Aula = a.ID_Aul 
            LEFT JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula
            LEFT JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
            LEFT JOIN tipoempleado te2 ON te2.ID_TipEmp = e2.ID_TipEmp
            LEFT JOIN equipo eq ON eq.ID_Aul = a.ID_Aul
            LEFT JOIN tipoequipo teq ON teq.ID_TipEquipo = eq.ID_TipEquipo
            WHERE i.Folio = ?
            ORDER BY Folio`,
            [folio]
        );

        return rows[0]; // Asegúrate de devolver solo la primera fila, ya que estás buscando por un folio único
    } catch (error) {
        return { error: "No se pudo obtener las incidencias" };
    }
}


// agregar una incidencia
export const addIncidents = async (incidencia: IncidentNew) => {
    try {
        const { Descripcion, ID_Periodo,Estado,Fecha, Hora, ID_Aula} = incidencia;
        console.log(Descripcion, ID_Periodo,Estado,Fecha, Hora, ID_Aula)
        const [result] = await connection.query(
            'INSERT INTO incidencia (Descripcion, Fecha, Hora,Estado, ID_Aula, ID_Periodo) VALUES (?, ?, ?, ?, ?, ?)', 
            [Descripcion, Fecha, Hora,Estado, ID_Aula, ID_Periodo]
        );
        return result;
    } catch (error) {
        return { error: "no se pudo agregar la incidencia" };
    }
}

// asignar prioridad y tecnico a la incidencia
export const updateIncident = async (folio: string, Prioridad: string, ID_Rec: number) => {
    try {
        const [result] = await connection.query(
            'UPDATE incidencia SET Prioridad = ?, ID_Rec = ? WHERE Folio = ?', 
            [Prioridad, ID_Rec, folio]
        );
        return result;
    } catch (error) {
        return { error: "no se pudo actualizar la incidencia" };
    }
}

// actualizar el estado de la incidencia
export const updateEstadoIncident = async (folio: string, estado: string) => {
    try {
        const [result] = await connection.query(
            'UPDATE incidencia SET Estado = ? WHERE Folio = ?', 
            [estado, folio]
        );
        return result;
    } catch (error) {
        return { error: "no se pudo actualizar el estado de la incidencia" };
    }
}


