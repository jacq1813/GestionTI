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

//http://localhost:3001/employees/:id
router.get('/:id', async (req: Request, res: Response) => {
    const employee = await employeeService.getEmployeeById(Number(req.params.id));
    if (employee) {
        res.status(200).send(employee);
    } else {
        res.status(404).send({ error: 'Employee not found' });
    }
});

//http://localhost:3001/employees
router.post('/', async (req: Request, res: Response) => {
    try {
        const { Nombre, ApellidoPat, ApellidoMat, Num_tel, ID_TipEmp,Calificacion,Correo,Contrasena } = req.body;
        const newEmployee = await employeeService.addEmployee({ Nombre, ApellidoPat, ApellidoMat, Num_tel, ID_TipEmp,Calificacion,Correo,Contrasena });
        res.status(201).send(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Could not add employee' });
    }
});

//http://localhost:3001/employees/:id
router.put('/:id', async (req: Request, res: Response) => {
    const employee = req.body;
    const updatedEmployee = await employeeService.updateEmployee(Number(req.params.id), employee);
    if (updatedEmployee) {
        res.status(200).send(updatedEmployee);
    } else {
        res.status(404).send({ error: 'Employee not found' });
    }
});

//http://localhost:3001/employees/:id
router.delete('/:id', async (req: Request, res: Response) => {
    const deletedEmployee = await employeeService.deleteEmployee(Number(req.params.id));
    if (deletedEmployee) {
        res.status(200).send(deletedEmployee);
    } else {
        res.status(404).send({ error: 'Employee not found' });
    }
});



export default router;