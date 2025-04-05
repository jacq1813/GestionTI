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

//http://localhost:3001/incidents/recandemi/:folio
router.get('/recandemi/:folio', async (req: Request, res: Response) => {
    const folio = req.params.folio;
    const incidents = await incidentService.getIncidentsByFolio(folio);
    res.status(200).send(incidents);
});


router.post('/', async (req: Request, res: Response) => {
    try {
        const { Descripcion, Fecha, Hora, ID_Aula} = req.body;
        const newIncident = await incidentService.addIncidents({Descripcion, Fecha, Hora, ID_Aula});
        res.send(newIncident);

    }catch(e) {
        res.send({ error: "no se pudo agregar la incidencia" });
    }
});

// asignar prioridad y tecnico a la incidencia
router.put('/:folio', async (req: Request, res: Response) => {
    const folio = req.params.folio;
    const { Prioridad, ID_Rec } = req.body;
    const updatedIncident = await incidentService.updateIncident(folio, Prioridad, ID_Rec);
    res.send(updatedIncident);
});

// actualizar estado de la incidencia
router.put('/estado/:folio', async (req: Request, res: Response) => {
    const folio = req.params.folio;
    const { estado } = req.body;
    const updatedIncident = await incidentService.updateEstadoIncident(folio, estado);
    res.send(updatedIncident);
});

export default router;