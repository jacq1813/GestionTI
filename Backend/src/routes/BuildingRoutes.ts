import express, { Request, Response } from 'express';

import * as buildingService from '../services/BuildingService';

const router = express.Router();

//http://localhost:3001/buildings
router.get('/', async (_req: Request, res: Response) => {
    const buildings = await buildingService.getBuildings();
    res.status(200).send(buildings);
});

export default router;