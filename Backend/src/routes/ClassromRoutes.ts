import express, { Request, Response } from 'express';
import * as classroomService from '../services/ClassromService';

const router = express.Router();

//http://localhost:3001/classrooms
router.get('/', async (_req: Request, res: Response) => {
    const classrooms = await classroomService.getClassrooms();
    res.status(200).send(classrooms);
});

export default router;