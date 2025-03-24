//import { DeviceTNew } from '../typesDeviceT';

const connection = require('../connection/conec');

//obtener todos los equipos
export const getDevicesT = async () => {
    try {
        const [rows] = await connection.query('SELECT *FROM tipoequipo');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los dispositivos" };
    }
}
