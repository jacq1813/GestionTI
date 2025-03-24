import express, { Request, Response } from 'express';
import * as classroomService from '../services/TypesClassromService'

const router = express.Router();

//http://localhost:3001/TyClass
router.get('/', async (_req: Request, res: Response) => {
    const TyClass = await classroomService.getTipoAulas();
    res.status(200).send(TyClass);
});