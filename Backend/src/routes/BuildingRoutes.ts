import express, { Request, Response } from 'express';

import * as buildingService from '../services/BuildingService';

const router = express.Router();

//http://localhost:3001/buildings
router.get('/', async (_req: Request, res: Response) => {
    const buildings = await buildingService.getBuildings();
    res.status(200).send(buildings);
});

//agregar un edificio
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Nombre, ID_Emp, ID_TipDpto } = req.body;
        const newBuilding = await buildingService.addBuilding({ Nombre, ID_Emp, ID_TipDpto });
        res.send(newBuilding);
    } catch (e) {
        res.send({ error: "no se pudo agregar el edificio" });
    }
});

export default router;