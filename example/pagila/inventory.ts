import { z } from 'zod';

export const Inventory = z.object({
  inventory_id: z.number().int().optional(),
  film_id: z.number().int(),
  store_id: z.number().int(),
  last_update: z.string().optional(),
});

export type InventoryT = z.infer<typeof Inventory>;
