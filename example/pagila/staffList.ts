import { z } from 'zod';

export const StaffList = z.object({
  id: z.number().int().nullable().optional(),
  name: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  zip code: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  sid: z.number().int().nullable().optional(),
});

export type StaffListT = z.infer<typeof StaffList>;
