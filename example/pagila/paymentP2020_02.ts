import { z } from 'zod';

export const PaymentP2020_02 = z.object({
  payment_id: z.number().int().optional(),
  customer_id: z.number().int(),
  staff_id: z.number().int(),
  rental_id: z.number().int(),
  amount: z.number(),
  payment_date: z.string(),
});

export type PaymentP2020_02T = z.infer<typeof PaymentP2020_02>;
