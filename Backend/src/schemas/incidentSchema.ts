import { z } from 'zod';

export const incidentSchema = z.object({
    folio: z.number(),
    descripcion: z.string(),
    fecha: z.string(),
    hora: z.string(),
    periodo: z.string(),
    estatus: z.string(),
    id_aula: z.number(),
    id_periodo: z.number(),
    id_emp: z.number(),
    id_incidente: z.number()
});