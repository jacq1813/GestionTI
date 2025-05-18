import { SolveProblems,SolveProblemsNew } from "../typesSolveProblems";

const connection = require('../connection/conec');

export const getSolucionesProblema = async () => {
    try {
        const [rows] = await connection.query("SELECT * FROM solucionincidencia");
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener las soluciones de los problemas"}
    }
};

export const getSolucionProblemaById = async (id: number) => {
    try {
        const [rows] = await connection.query("SELECT * FROM solucionincidencia WHERE ID_Solucion = ?", [id]);
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener las soluciones de los problemas"}
    }
}

export const createSolucionProblema = async (solucion: SolveProblemsNew) => {
    try {
        const [result] = await connection.query(
            "INSERT INTO solucionincidencia (Descripcion) VALUES (?)", 
            [solucion.Descripcion]
        );
        
        // Retornar el ID insertado
        return { success: true, id: result.insertId };
    } catch (error) {
        console.error(error);
        return { error: "No se pueden crear las soluciones de los problemas" };
    }
};

export const updateSolucionProblema = async (id: number, solucion: SolveProblems) => {
    try {
        const [rows] = await connection.query("UPDATE solucionincidencia SET Descripcion = ? WHERE ID_Solucion = ?", [solucion.Descripcion, id]);
        return rows;
    } catch (error) {
        return {error: "no se pueden actualizar las soluciones de los problemas"}
    }
};

export const deleteSolucionProblema = async (id: number) => {
    try {
        const [rows] = await connection.query("DELETE FROM solucionincidencia WHERE ID_Solucion = ?", [id]);
        return rows;
    } catch (error) {
        return {error: "no se pueden eliminar las soluciones de los problemas"}
    }
};

