import { z } from 'zod';
export const EmployeeSchema = z.object({
    ID_Emp: z.number(),
    Nombre: z.string(),
    ApellidoPat: z.string(),
    ApellidoMat: z.string(),
    Num_tel: z.string(),
    ID_TipEmp: z.number(),
    Calificacion: z.number(),
    Correo: z.string(),
    Contrasena: z.string()
});
