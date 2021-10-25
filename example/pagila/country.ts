import { z } from 'zod';

export const Country = z.object({
  country_id: z.number().int().optional(),
  country: z.string(),
  last_update: z.string().optional(),
});

export type CountryT = z.infer<typeof Country>;
