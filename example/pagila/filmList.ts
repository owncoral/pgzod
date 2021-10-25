import { z } from 'zod';

export const FilmList = z.object({
  fid: z.number().int().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  length: z.int2().nullable().optional(),
  rating: z.mpaa_rating().nullable().optional(),
  actors: z.string().nullable().optional(),
});

export type FilmListT = z.infer<typeof FilmList>;
