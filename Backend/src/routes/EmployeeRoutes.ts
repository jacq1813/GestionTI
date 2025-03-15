import express, { Request, Response } from 'express';
import * as employeeService from '../services/EmployeeService';

const router = express.Router();

//http://localhost:3001/employees
router.get('/', async (_req: Request, res: Response) => {
    const employees = await employeeService.getEmployees();
    res.status(200).send(employees);
});

//http://localhost:3001/employees/tech
router.get('/tech', async (_req: Request, res: Response) => {
    const techEmployees = await employeeService.getTechEmployees();
    res.status(200).send(techEmployees);
});

export default router;