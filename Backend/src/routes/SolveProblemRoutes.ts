import express, { Request, Response } from 'express';
import * as problemService from '../services/SolveProblemServices';

const router = express.Router();

//http://localhost:3001/Sproblems
router.get('/', async (_req: Request, res: Response) => {
    const problems = await problemService.getSolucionesProblema();
    res.status(200).send(problems);
});

//http://localhost:3001/Sproblems/:id
router.get('/:id', async (req: Request, res: Response) => {
    const problem = await problemService.getSolucionProblemaById(Number(req.params.id));
    res.status(200).send(problem);
});

//http://localhost:3001/Sproblems
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Descripcion } = req.body;
        const newProblem = await problemService.createSolucionProblema({ Descripcion });
        res.status(201).send(newProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not add problem' });
    }
});

//http://localhost:3001/Sproblems/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { Descripcion } = req.body;
        const updatedProblem = await problemService.updateSolucionProblema(Number(req.params.id),  Descripcion );
        res.status(200).send(updatedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not update problem' });
    }
});

//http://localhost:3001/Sproblems/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedProblem = await problemService.deleteSolucionProblema(Number(req.params.id));
        res.status(200).send(deletedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not delete problem' });
    }
});
export default router;