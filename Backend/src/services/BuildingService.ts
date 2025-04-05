//import { BuildingSchema} from '../schemas/BuildingSchema';
import { BuildingNew } from '../typesBuilding';

const connection = require('../connection/conec');

export const getBuildings = async () => {
    try {
        const [rows] = await connection.query('SELECT e.*, td.Nombre AS Nombre_Departamento FROM Edificio e JOIN TipoDepartamento td ON e.ID_TipDpto = td.ID_TipDpto');
        return rows;

    } catch (error) {
        return { error: "no se pudo obtener los edificios"};
    }
}


//agregar un edificio
export const addBuilding = async (building: BuildingNew) => {

    try {
        
        const [rows] = await connection.query('INSERT INTO Edificio (Nombre,ID_Emp,ID_TipDpto) values (?,?,?)', [building.Nombre, building.ID_Emp, building.ID_TipDpto]);
        console.log(rows);
        console.log(rows);
        return rows;
    } catch (error) {
        return { error: "no se pudo agregar el edificio" };
    }
}
