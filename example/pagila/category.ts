import { z } from 'zod';

export const Category = z.object({
  category_id: z.number().int().optional(),
  name: z.string(),
  last_update: z.string().optional(),
});

export type CategoryT = z.infer<typeof Category>;
