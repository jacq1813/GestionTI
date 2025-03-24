import { z } from 'zod';
export const DeviceSchema = z.object({
    id: z.number(),
    Nombre: z.string(),
    id_edificio: z.number(),
    fecha_ult_mod: z.string(),
    version: z.string(),
    fecha_instalacion: z.string(),
    id_aula: z.number(),
    id_tipoEquipo: z.number(),
});