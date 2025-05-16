import { z } from 'zod';

export const solveproblemSchema = z.object({
    id_solucion: z.number(),
    descripcion: z.string(),
});