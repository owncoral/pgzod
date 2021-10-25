import { z } from 'zod';

export const Staff = z.object({
  staff_id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  address_id: z.number().int(),
  email: z.string().nullable().optional(),
  store_id: z.number().int(),
  active: z.boolean().optional(),
  username: z.string(),
  password: z.string().nullable().optional(),
  last_update: z.string().optional(),
  picture: z.bytea().nullable().optional(),
});

export type StaffT = z.infer<typeof Staff>;
