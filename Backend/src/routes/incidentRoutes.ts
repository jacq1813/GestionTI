import express, { Request, Response } from 'express';
import * as incidentService from '../services/incidentService';

const router = express.Router();

//http://localhost:3001/incidents
router.get('/', async (_req: Request, res: Response) => {
    const incidents = await incidentService.getIncidents();
    res.status(200).send(incidents);
});

//http://localhost:3001/incidents/recandemi
router.get('/recandemi', async (_req: Request, res: Response) => {
    const incidents = await incidentService.getIncidentsRecandEmi();
    res.status(200).send(incidents);
});

export default router;