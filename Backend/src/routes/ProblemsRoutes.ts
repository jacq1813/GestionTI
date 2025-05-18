import express, { Request, Response } from 'express';
import * as problemService from '../services/ProblemsServices';

const router = express.Router();

//http://localhost:3001/problems
router.get('/', async (_req: Request, res: Response) => {
    const problems = await problemService.getProblemas();
    console.log(problems);
    res.status(200).send(problems);
});

//http://localhost:3001/problems/details
router.get('/details', async (_req: Request, res: Response) => {
    const problems = await problemService.getProblemasDetalles();
    console.log(problems);
    res.status(200).send(problems);
});

//http://localhost:3001/problems/:id
router.get('/:id', async (req: Request, res: Response) => {
    const problem = await problemService.getProblemaById(Number(req.params.id));
    res.status(200).send(problem);
});

//http://localhost:3001/problems/:folio
router.get('/:folio', async (req: Request, res: Response) => {
    const problem = await problemService.getProblemaByFolio(Number(req.params.folio));
    res.status(200).send(problem);
});

//http://localhost:3001/problems
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Folio_Incidencia, ID_Emp, ID_Causa, ID_Solucion } = req.body;
        const newProblem = await problemService.addProblema({ Folio_Incidencia, ID_Emp, ID_Causa, ID_Solucion });
        res.status(201).send(newProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not add problem' });
    }
});

// En router de problemas (por ejemplo /api/problemas/:folio)
router.put('/:folio', async (req: Request, res: Response) => {
    try {
        const problemaActualizado = await problemService.updateProblema(req.body);
        res.status(200).send(problemaActualizado);
    } catch (error) {
        res.status(500).send({ error: 'No se pudo actualizar el problema' });
    }
});


export default router;

