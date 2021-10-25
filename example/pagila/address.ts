import { z } from 'zod';

export const Address = z.object({
  address_id: z.number().int().optional(),
  address: z.string(),
  address2: z.string().nullable().optional(),
  district: z.string(),
  city_id: z.number().int(),
  postal_code: z.string().nullable().optional(),
  phone: z.string(),
  last_update: z.string().optional(),
});

export type AddressT = z.infer<typeof Address>;
