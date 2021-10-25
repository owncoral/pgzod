import { z } from 'zod';

export const ActorInfo = z.object({
  actor_id: z.number().int().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  film_info: z.string().nullable().optional(),
});

export type ActorInfoT = z.infer<typeof ActorInfo>;
