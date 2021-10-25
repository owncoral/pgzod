import { z } from 'zod';

export const Film = z.object({
  film_id: z.number().int().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
  release_year: z.number().int().nullable().optional(),
  language_id: z.number().int(),
  original_language_id: z.number().int().nullable().optional(),
  rental_duration: z.int2().optional(),
  rental_rate: z.number().optional(),
  length: z.int2().nullable().optional(),
  replacement_cost: z.number().optional(),
  rating: z.mpaa_rating().nullable().optional().optional(),
  last_update: z.string().optional(),
  special_features: z._text().nullable().optional(),
  fulltext: z.tsvector(),
});

export type FilmT = z.infer<typeof Film>;
