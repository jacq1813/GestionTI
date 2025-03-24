import { z } from 'zod';

export const classSchema = z.object({
    ID_TipoAula: z.number(),
    Nombre: z.string()
})
