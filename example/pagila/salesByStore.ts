import { z } from 'zod';

export const SalesByStore = z.object({
  store: z.string().nullable().optional(),
  manager: z.string().nullable().optional(),
  total_sales: z.number().nullable().optional(),
});

export type SalesByStoreT = z.infer<typeof SalesByStore>;
