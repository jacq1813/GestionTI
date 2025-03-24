import express, { Request, Response } from 'express';

import * as deviceTService from '../services/DeviceTService';

const router = express.Router();

//http://localhost:3001/devicesT
router.get('/', async (_req: Request, res: Response) => {
    const devices = await deviceTService.getDevicesT();
    res.status(200).send(devices);
});

export default router;