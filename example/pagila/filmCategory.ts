import { z } from 'zod';

export const FilmCategory = z.object({
  film_id: z.number().int(),
  category_id: z.number().int(),
  last_update: z.string().optional(),
});

export type FilmCategoryT = z.infer<typeof FilmCategory>;
