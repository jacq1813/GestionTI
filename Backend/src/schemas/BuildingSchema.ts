import {z } from 'zod';
export const BuildingSchema = z.object({
    id: z.number(),
    Nombre: z.string(),
    id_empleado: z.number(),
    id_tipDpto: z.number()
});