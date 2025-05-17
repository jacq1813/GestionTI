import { CauseProblem, CauseProblemNew } from "../typesCauseProblem";

const connection = require('../connection/conec');

export const getCausasProblema = async () => {
    try {
        const [rows] = await connection.query("SELECT * FROM causaincidencia");
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener las causas de los problemas"}
    }
};

export const getCausaProblemaById = async (id: number) => {
    try {
        const [rows] = await connection.query("SELECT * FROM causaincidencia WHERE ID_Causa = ?", [id]);
        return rows;
    } catch (error) {
        return {error: "no se pueden obtener las causas de los problemas"}
    }
}

export const createCausaProblema = async (causa: CauseProblemNew) => {
    try {
        const [rows] = await connection.query("INSERT INTO causaincidencia (Descripcion) VALUES (?)", [causa.Descripcion]);
        return rows;
    } catch (error) {
        return {error: "no se pueden crear las causas de los problemas"}
    }
};

export const updateCausaProblema = async (id: number, causa: CauseProblem) => {
    try {
        console.log("hola buenassss "+causa.Descripcion);
        const [rows] = await connection.query("UPDATE causaincidencia SET Descripcion = ? WHERE ID_Causa = ?", [causa.Descripcion, id]);
        return rows;
    } catch (error) {
        return {error: "no se pueden actualizar las causas de los problemas"}
    }
};

export const deleteCausaProblema = async (id: number) => {
    try {
        const [rows] = await connection.query("DELETE FROM causaincidencia WHERE ID_Causa = ?", [id]);
        return rows;
    } catch (error) {
        return {error: "no se pueden eliminar las causas de los problemas"}
    }
};

