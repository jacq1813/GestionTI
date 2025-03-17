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

//http://localhost:3001/incidents/recandemi/:estado:periodo:anio
router.get('/recandemi/:estado/:periodo/:anio', async (req: Request, res: Response) => {
    const estado = req.params.estado;
    const periodo = req.params.periodo;
    const anio = req.params.anio;
    const incidents = await incidentService.getIncidentsByEstadoPeriodoAnio(estado, periodo, anio);
    res.status(200).send(incidents);
});



export default router;