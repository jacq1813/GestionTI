import express, { Request, Response } from 'express';
import * as logService from '../services/LogService';

const router = express.Router();

//http://localhost:3001/logs
router.get('/', async (_req: Request, res: Response) => {
    const logs = await logService.getLogs();
    res.status(200).send(logs);
});

//http://localhost:3001/logs/details
router.get('/det', async (_req: Request, res: Response) => {
    const logs = await logService.getLogsDetails();
    res.status(200).send(logs);
});

//http://localhost:3001/logs/:id
router.get('/:id', async (req: Request, res: Response) => {
    const log = await logService.getLogById(Number(req.params.id));
    if (log) {
        res.status(200).send(log);
    }else{
        res.status(404).send({ error: 'Log not found' });
    }
});

//http://localhost:3001/logs
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Folio_Incidencia, Fecha_Cambio, Descripcion, Estado, ID_Emp } = req.body;
        const newLog = await logService.addLog({ Folio_Incidencia, Fecha_Cambio, Descripcion, Estado,ID_Emp });
        res.status(201).send(newLog);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not add log' });
    }
});

export default router;