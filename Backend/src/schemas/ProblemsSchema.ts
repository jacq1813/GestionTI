import { z } from 'zod';

export const problemsSchema = z.object({
    id_problema: z.number(),
    folio_incidencia: z.number(),
    id_emp: z.number(),
    id_tipo_problema: z.number(),
    id_tipo_solucion: z.number()
});