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

//http://localhost:3001/incidents/proceso
router.get('/proceso', async (_req: Request, res: Response) => {
    const incidents = await incidentService.getIncidentsProceso();
    res.status(200).send(incidents);
});

//http://localhost:3001/incidents/terminada
router.get('/terminada', async (_req: Request, res: Response) => {
    const incidents = await incidentService.getIncidentsTerminada();
    res.status(200).send(incidents);
});

//http://localhost:3001/incidents/liberada
router.get('/liberada', async (_req: Request, res: Response) => {
    const incidents = await incidentService.getIncidentsLiberada();
    res.status(200).send(incidents);
});

//http://localhost:3001/incidents/rechazada
router.get('/rechazada', async (_req: Request, res: Response) => {
    const incidents = await incidentService.getIncidentsRechazada();
    res.status(200).send(incidents);
});



export default router;