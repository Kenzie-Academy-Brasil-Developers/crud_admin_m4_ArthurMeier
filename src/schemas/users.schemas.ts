import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const requestUserSchema = userSchema.omit({ id: true });

const responseUserSchema = userSchema.omit({ password: true });

const updateUserSchema = userSchema.partial();

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema };
