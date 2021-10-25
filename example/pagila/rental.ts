import { z } from 'zod';

export const Rental = z.object({
  rental_id: z.number().int().optional(),
  rental_date: z.string(),
  inventory_id: z.number().int(),
  customer_id: z.number().int(),
  return_date: z.string().nullable().optional(),
  staff_id: z.number().int(),
  last_update: z.string().optional(),
});

export type RentalT = z.infer<typeof Rental>;
