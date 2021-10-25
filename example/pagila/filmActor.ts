import { z } from 'zod';

export const FilmActor = z.object({
  actor_id: z.number().int(),
  film_id: z.number().int(),
  last_update: z.string().optional(),
});

export type FilmActorT = z.infer<typeof FilmActor>;
