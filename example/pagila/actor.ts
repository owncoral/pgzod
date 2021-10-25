import { z } from 'zod';

export const Actor = z.object({
  actor_id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  last_update: z.string().optional(),
});

export type ActorT = z.infer<typeof Actor>;
