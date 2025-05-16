import { z } from 'zod';

export const causeProblemSchema = z.object({
    id_causa: z.number(),
    descripcion: z.string()
});