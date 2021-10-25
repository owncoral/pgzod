import { z } from 'zod';

export const City = z.object({
  city_id: z.number().int().optional(),
  city: z.string(),
  country_id: z.number().int(),
  last_update: z.string().optional(),
});

export type CityT = z.infer<typeof City>;
