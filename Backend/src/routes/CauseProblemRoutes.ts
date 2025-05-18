import express, { Request, Response } from 'express';
import * as problemService from '../services/CauseProblemServices';

const router = express.Router();

//http://localhost:3001/Cproblems
router.get('/', async (_req: Request, res: Response) => {
    const problems = await problemService.getCausasProblema();
    res.status(200).send(problems);
});

//http://localhost:3001/Cproblems/:id
router.get('/:id', async (req: Request, res: Response) => {
    const problem = await problemService.getCausaProblemaById(Number(req.params.id));
    res.status(200).send(problem);
});

//http://localhost:3001/Cproblems
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Descripcion } = req.body;
        console.log("hola buenas "+ Descripcion);
        const newProblem = await problemService.createCausaProblema({ Descripcion });
        res.status(201).send(newProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not add problem' });
    }
});

//http://localhost:3001/Cproblems/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const Descripcion = req.body;
        console.log("hola buenas "+Descripcion);
        const updatedProblem = await problemService.updateCausaProblema(Number(req.params.id),  Descripcion );
        res.status(200).send(updatedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not update problem' });
    }
});

//http://localhost:3001/Cproblems/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedProblem = await problemService.deleteCausaProblema(Number(req.params.id));
        res.status(200).send(deletedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not delete problem' });
    }
});
export default router;