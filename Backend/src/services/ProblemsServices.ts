import { Problems,ProblemsNew } from "../typesProblems";

const connection = require('../connection/conec');

export const getProblemas = async () => {
    try {
        const [rows] = await connection.query("SELECT * FROM problemaincidencia");
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener los problemas"}
    }
};

export const getProblemasDetalles = async () => {
    try {
        const [rows] = await connection.query( `SELECT 
                            pi.ID_Problema, 
                            i.Folio, 
                            i.Descripcion AS "Descripcion de Incidencia",
                            CONCAT(e.Nombre, ' ', e.ApellidoPat, ' ', e.ApellidoMat) AS "Tecnico Diagnostico",
                            ci.Descripcion AS "Causa del problema", 
                            si.Descripcion AS "Solucion del problema", 
                            i.Estado, 
                            i.Prioridad 
                            FROM problemaincidencia pi 
                            LEFT JOIN incidencia i ON pi.Folio_Incidencia = i.Folio
                            LEFT JOIN empleado e ON pi.ID_Emp = e.ID_Emp
                            LEFT JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
                            LEFT JOIN causaincidencia ci ON pi.ID_Causa = ci.ID_Causa
                            LEFT JOIN solucionincidencia si ON pi.ID_Solucion = si.ID_Solucion;
                            `);

                            console.log(rows);
        return rows;

    } catch (error) {
        return {error: "no se pueden obtener los problemas"}
    }
}

export const getProblemaById = async (id: number) => {
    try {
        const [rows] = await connection.query(`SELECT 
                            pi.ID_Problema, 
                            i.Folio, 
                            i.Descripcion AS "Descripcion de Incidencia",
                            CONCAT(e.Nombre, ' ', e.ApellidoPat, ' ', e.ApellidoMat) AS "Tecnico Diagnostico",
                            ci.Descripcion AS "Causa del problema", 
                            si.Descripcion AS "Solucion del problema", 
                            i.Estado, 
                            i.Prioridad 
                            FROM problemaincidencia pi 
                            LEFT JOIN incidencia i ON pi.Folio_Incidencia = i.Folio
                            LEFT JOIN empleado e ON pi.ID_Emp = e.ID_Emp
                            LEFT JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
                            LEFT JOIN causaincidencia ci ON pi.ID_Causa = ci.ID_Causa
                            LEFT JOIN solucionincidencia si ON pi.ID_Solucion = si.ID_Solucion
                            WHERE ID_Problema = ?;`, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        return {error: "no se pueden obtener los problemasSS"}
    }
}

export const getProblemaByFolio = async (folio: number) => {
    try {
        const [rows] = await connection.query(`SELECT 
                            pi.ID_Problema, 
                            i.Folio, 
                            i.Descripcion AS "Descripcion de Incidencia",
                            CONCAT(e.Nombre, ' ', e.ApellidoPat, ' ', e.ApellidoMat) AS "Tecnico Diagnostico",
                            ci.Descripcion AS "Causa del problema", 
                            si.Descripcion AS "Solucion del problema", 
                            i.Estado, 
                            i.Prioridad 
                            FROM problemaincidencia pi 
                            LEFT JOIN incidencia i ON pi.Folio_Incidencia = i.Folio
                            LEFT JOIN empleado e ON pi.ID_Emp = e.ID_Emp
                            LEFT JOIN tipoempleado te ON te.ID_TipEmp = e.ID_TipEmp
                            LEFT JOIN causaincidencia ci ON pi.ID_Causa = ci.ID_Causa
                            LEFT JOIN solucionincidencia si ON pi.ID_Solucion = si.ID_Solucion
                            WHERE Folio = ?;`, [folio]);
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener los problemas"}
    }
}

//agregar un problema
export const addProblema = async (problema: ProblemsNew) => {
    console.log(problema);
    try {
        const [rows] = await connection.query(`INSERT INTO problemaincidencia (Folio_Incidencia, ID_Emp, ID_Causa, ID_Solucion) VALUES (?, ?, ?, ?)`, [problema.Folio_Incidencia, problema.ID_Emp, problema.ID_Causa, problema.ID_Solucion]);
        return rows;
    } catch (error) {
        return {error: "no se pueden agregar los problemas"}
    }
}

//actualizar un problema
export const updateProblema = async (problema: Problems) => {
    try {
        const [rows] = await connection.query(`UPDATE problemaincidencia SET ID_Emp = ?, ID_Causa = ?, ID_Solucion = ? WHERE Folio_Incidencia = ?`, [problema.ID_Emp, problema.ID_Causa, problema.ID_Solucion, problema.Folio_Incidencia]);
        return rows;
    } catch (error) {
        return {error: "no se pueden actualizar los problemas"}
    }
}