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


router.post('/', async (req: Request, res: Response) => {
    try {
        const  { Nombre, ID_TipoAula, ID_Edif, ID_Emp } = req.body;
        const newBuilding = await classroomService.addClassroom({ Nombre, ID_TipoAula, ID_Edif, ID_Emp})
        res.send(newBuilding);
    } catch (e) {
        res.send({ error: "no se pudo agregar el edificio" });
    }
});



export default router;