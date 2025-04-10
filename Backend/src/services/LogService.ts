import { LogNew } from '../typesLog';

const connection = require('../connection/conec'); 

//obtener todas las bitacoras
export const getLogs = async () => {
    try {
        const [rows] = await connection.query('SELECT * FROM bitacoraincidencias');
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las bitacoras" };
    }
}

//obtener todas las bitacoras con detalles
export const getLogsDetails = async () => {
    try {
        const [rows] = await connection.query(`SELECT bi.Id_Bitacora, bi.Folio_Incidencia, bi.Fecha_cambio,bi.Descripcion AS 'Descripcion Bitacora',i.Descripcion as 'Descripcion Incidencia', i.Fecha as 'Fecha Incidencia',bi.Estado, i.Prioridad, i.Hora, ed.Nombre as 'Edificio', a.Nombre as 'Aula',ta.Nombre AS 'Tipo Aula', CONCAT(E.Nombre, ' ', E.ApellidoPat, ' ', E.ApellidoMat) AS 'Emisor', CONCAT(E2.Nombre, ' ', E2.ApellidoPat, ' ', E2.ApellidoMat) AS 'Receptor', eq.Version  FROM bitacoraincidencias bi
                    INNER JOIN incidencia i ON bi.Folio_Incidencia = i.Folio
                    INNER JOIN aula a ON i.ID_Aula = a.ID_Aul
                    INNER JOIN edificio ed ON a.ID_Edif = ed.ID_Edif
                    INNER JOIN empleado e ON i.ID_Emi = e.ID_Emp
                    INNER JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
                    INNER JOIN equipo eq ON eq.ID_Aul = a.ID_Aul
                    INNER JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula;
                `);
        return rows;
    } catch (error) {
        return { error: "no se pudo obtener las bitacoras" };
    }
}

//obtener una bitacora por id
export const getLogById = async (id: number) => {
    try {
        const [rows] = await connection.query(`SELECT bi.Id_Bitacora, bi.Folio_Incidencia, bi.Fecha_cambio,bi.Descripcion AS 'Descripcion Bitacora',i.Descripcion as 'Descripcion Incidencia', i.Fecha as 'Fecha Incidencia',bi.Estado, i.Prioridad, i.Hora, ed.Nombre as 'Edificio', a.Nombre as 'Aula',ta.Nombre AS 'Tipo Aula', CONCAT(E.Nombre, ' ', E.ApellidoPat, ' ', E.ApellidoMat) AS 'Emisor', CONCAT(E2.Nombre, ' ', E2.ApellidoPat, ' ', E2.ApellidoMat) AS 'Receptor', eq.Version  FROM bitacoraincidencias bi
                    INNER JOIN incidencia i ON bi.Folio_Incidencia = i.Folio
                    INNER JOIN aula a ON i.ID_Aula = a.ID_Aul
                    INNER JOIN edificio ed ON a.ID_Edif = ed.ID_Edif
                    INNER JOIN empleado e ON i.ID_Emi = e.ID_Emp
                    INNER JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
                    INNER JOIN equipo eq ON eq.ID_Aul = a.ID_Aul
                    INNER JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula WHERE bi.Id_Bitacora = ?;`, 
                    [id]);
        return rows[0];
    } catch (error) {
        return { error: "no se pudo obtener la bitacora" };
    }
}

//agregar una bitacora
export const addLog = async (log: LogNew) => {
    try {
        const [rows] = await connection.query('INSERT INTO bitacoraincidencias (Folio_Incidencia, Fecha_Cambio, Estado , Descripcion, ID_Emp) values (?,?,?,?,?)', [log.Folio_Incidencia, log.Fecha_Cambio,log.Estado,  log.Descripcion, log.ID_Emp]);
        return rows;
    } catch (error) {
        return { error: "no se pudo agregar la bitacora" };
    }
}