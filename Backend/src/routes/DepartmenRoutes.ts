import express, { Request, Response } from 'express';

import * as departmentService from '../services/DepartmenService';

const router = express.Router();

//http://localhost:3001/departments
router.get('/', async (_req: Request, res: Response) => {
    const departments = await departmentService.getDepartments();
    res.status(200).send(departments);
});

export default router;