import { z } from 'zod';

export const SalesByFilmCategory = z.object({
  category: z.string().nullable().optional(),
  total_sales: z.number().nullable().optional(),
});

export type SalesByFilmCategoryT = z.infer<typeof SalesByFilmCategory>;
