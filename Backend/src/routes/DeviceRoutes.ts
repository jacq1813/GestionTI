import express, { Request, Response } from 'express';
import * as deviceService from '../services/DeviceService';

const router = express.Router();

//http://localhost:3001/devices
router.get('/', async (_req: Request, res: Response) => {
    const devices = await deviceService.getDevices();
    res.status(200).send(devices);
});

export default router;