import express, { Request, Response } from 'express';
import * as deviceService from '../services/DeviceService';

const router = express.Router();

//http://localhost:3001/devices
router.get('/', async (_req: Request, res: Response) => {
    const devices = await deviceService.getDevices();
    res.status(200).send(devices);
});

//http://localhost:3001/devices/Detail
router.get('/Detail', async (_req: Request, res: Response) => {
    const devices = await deviceService.getDevicesDetail();
    res.status(200).send(devices);
});

//agregar un dispositivo
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Nombre,Fecha_Ult_Mod,Version,Fecha_Inst,ID_Aula,ID_TipEquipo } = req.body;
        console.log(req.body);
        const newDevice = await deviceService.addDevice({ Nombre,Fecha_Ult_Mod,Version,Fecha_Inst,ID_Aula,ID_TipEquipo });
        res.send(newDevice);
    } catch (e) {
        res.send({ error: "no se pudo agregar el dispositivo" });
    }
});

export default router;