import express, { Request, Response } from 'express';
import * as classroomService from '../services/ClassromService';

const router = express.Router();

//http://localhost:3001/classrooms
router.get('/', async (_req: Request, res: Response) => {
    const classrooms = await classroomService.getClassrooms();
    res.status(200).send(classrooms);
});

//http://localhost:3001/classrooms/Detail
router.get('/Detail', async (_req: Request, res: Response) => {
    const incidents = await classroomService.getClassroomsDetail();
    res.status(200).send(incidents);
});

export default router;