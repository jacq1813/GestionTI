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
        const [rows] = await connection.query(`SELECT 
        bi.Id_Bitacora AS ID_Bitacora, bi.Folio_Incidencia AS Folio_Incidencia, bi.Fecha_cambio AS Fecha_Cambio, bi.Descripcion AS Descripcion_Bitacora, 
        i.Descripcion AS Descripcion_Incidencia, i.Fecha AS Fecha_Incidencia, bi.Estado AS Estado, i.Prioridad AS Prioridad, i.Hora AS Hora, 
        ed.Nombre AS Edificio, a.Nombre AS Aula, ta.Nombre AS Tipo_Aula, CONCAT(e.Nombre, ' ', e.ApellidoPat, ' ', e.ApellidoMat) AS Emisor, 
        CONCAT(e2.Nombre, ' ', e2.ApellidoPat, ' ', e2.ApellidoMat) AS Receptor, 
        eq.Version AS Version
                    FROM bitacoraincidencias bi
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
        const [rows] = await connection.query(`SELECT 
        bi.Id_Bitacora AS ID_Bitacora, 
        bi.Folio_Incidencia AS Folio_Incidencia, 
        bi.Fecha_cambio AS Fecha_Cambio, 
        bi.Descripcion AS Descripcion_Bitacora, 
        i.Descripcion AS Descripcion_Incidencia, 
        i.Fecha AS Fecha_Incidencia, 
        bi.Estado AS Estado, 
        i.Prioridad AS Prioridad, 
        i.Hora AS Hora, 
        ed.Nombre AS Edificio, 
        a.Nombre AS Aula, 
        ta.Nombre AS Tipo_Aula, 
        CONCAT(e.Nombre, ' ', e.ApellidoPat, ' ', e.ApellidoMat) AS Emisor, 
        CONCAT(e2.Nombre, ' ', e2.ApellidoPat, ' ', e2.ApellidoMat) AS Receptor, 
        eq.Version AS Version
    FROM bitacoraincidencias bi
    INNER JOIN incidencia i ON bi.Folio_Incidencia = i.Folio
    INNER JOIN aula a ON i.ID_Aula = a.ID_Aul
    INNER JOIN edificio ed ON a.ID_Edif = ed.ID_Edif
    INNER JOIN empleado e ON i.ID_Emi = e.ID_Emp
    INNER JOIN empleado e2 ON e2.ID_Emp = i.ID_Rec
    INNER JOIN equipo eq ON eq.ID_Aul = a.ID_Aul
    INNER JOIN tipoaula ta ON ta.ID_TipoAula = a.ID_TipoAula
    WHERE bi.Id_Bitacora = ?;
    `, 
                    [id]);
        return rows[0];
    } catch (error) {
        return { error: "no se pudo obtener la bitacora" };
    }
}

//agregar una bitacora
export const addLog = async (log: LogNew) => {
    console.log(log)
    try {
        const [rows] = await connection.query('INSERT INTO BitacoraIncidencias (Folio_Incidencia, Fecha_Cambio, Descripcion, Estado, ID_Emp) values (?,?,?,?,?)', [log.Folio_Incidencia, log.Fecha_Cambio,log.Descripcion, log.Estado, log.ID_Emp]);
        return rows;
    } catch (error) {
        return { error: "no se pudo agregar la bitacorssa" };
    }
}


// actualizar el estado de una bitácora
export const updateLogStatus = async (id: number, Estado: string) => {

    console.log("holaupdate")
    console.log(id)
    console.log(Estado)
    try {
        const [result] = await connection.query(
            `UPDATE BitacoraIncidencias 
             SET Estado = ? 
             WHERE Id_Bitacora = ?;`,
            [Estado, id]  
        );

        return result;
    } catch (error) {
        console.error("Error al actualizar la bitácora:", error);
        return { error: "No se pudo actualizar la bitácora" };
    }
}
