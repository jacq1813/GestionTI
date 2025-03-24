import { NewDevice } from "../typesDevice";


const connection = require('../connection/conec');

//obtener todos los equipos
export const getDevices = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM equipo');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los equipos" };
    }
}


export const getDevicesDetail = async () => {
    try {
        const query = `
        SELECT 
    d.ID_Equip, 
    d.Nombre, 
    d.Fecha_Ult_Mod, 
    d.Version, 
    d.Fecha_Inst, 
    t.Nombre AS TipoEquipo_Nombre, 
    a.Nombre AS Aula_Nombre,
    GROUP_CONCAT(c.Nombre ORDER BY c.Nombre ASC) AS Componentes_Nombres, 
    GROUP_CONCAT(c.Fecha_Ult_Mod ORDER BY c.Nombre ASC) AS Componentes_Fecha_Ult_Mod,
    GROUP_CONCAT(c.Version ORDER BY c.Nombre ASC) AS Componentes_Version,
    GROUP_CONCAT(c.Fecha_Inst ORDER BY c.Nombre ASC) AS Componentes_Fecha_Inst
FROM Equipo d
JOIN TipoEquipo t ON d.ID_TipEquipo = t.ID_TipEquipo
JOIN Aula a ON d.ID_Aul = a.ID_Aul
LEFT JOIN Componente c ON d.ID_Equip = c.ID_Equip
GROUP BY d.ID_Equip, d.Nombre, d.Fecha_Ult_Mod, d.Version, d.Fecha_Inst, t.Nombre, a.Nombre
ORDER BY d.ID_Equip;
        `;
        
        const [rows] = await connection.query(query);
        return rows;

    } catch (error) {
        return { error: "No se pudo obtener los equipos y componentes" };
    }
};

//agregar un equipo
export const addDevice = async (device: NewDevice) => {
    try {
        const [rows] = await connection.query('INSERT INTO equipo (Nombre, Fecha_Ult_Mod, Version, Fecha_Inst, ID_Aul, ID_TipEquipo) values (?,?,?,?,?,?)', [device.Nombre, device.Fecha_Ult_Mod, device.Version, device.Fecha_Inst, device.ID_Aula, device.ID_TipEquipo]);
        return rows;
    } catch (error) {
        return { error: "no se pudo agregar el equipo" };
    }
}