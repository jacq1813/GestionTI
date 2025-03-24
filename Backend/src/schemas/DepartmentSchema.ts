import { z } from 'zod';

export const departmentSchema = z.object({
    id: z.number(),
    Nombre: z.string()
});