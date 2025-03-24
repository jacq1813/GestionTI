import { z } from 'zod';
export const DeviceTSchema = z.object({
    id: z.number(),
    Nombre: z.string(),
});