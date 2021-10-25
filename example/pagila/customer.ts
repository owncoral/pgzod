import { z } from 'zod';

export const Customer = z.object({
  customer_id: z.number().int().optional(),
  store_id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().nullable().optional(),
  address_id: z.number().int(),
  activebool: z.boolean().optional(),
  create_date: z.string().optional(),
  last_update: z.string().nullable().optional().optional(),
  active: z.number().int().nullable().optional(),
});

export type CustomerT = z.infer<typeof Customer>;
