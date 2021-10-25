import { z } from 'zod';

export const Language = z.object({
  language_id: z.number().int().optional(),
  name: z.bpchar(),
  last_update: z.string().optional(),
});

export type LanguageT = z.infer<typeof Language>;
