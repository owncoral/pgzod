import { z } from 'zod';

export const Payment = z.object({
  payment_id: z.number().int().optional(),
  customer_id: z.number().int(),
  staff_id: z.number().int(),
  rental_id: z.number().int(),
  amount: z.number(),
  payment_date: z.string(),
});

export type PaymentT = z.infer<typeof Payment>;
