import { z } from 'zod';

export const Store = z.object({
  store_id: z.number().int().optional(),
  manager_staff_id: z.number().int(),
  address_id: z.number().int(),
  last_update: z.string().optional(),
});

export type StoreT = z.infer<typeof Store>;
