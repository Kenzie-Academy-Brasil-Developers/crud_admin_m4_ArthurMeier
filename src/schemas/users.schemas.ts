import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const requestUserSchema = userSchema.omit({ id: true });

const responseUserSchema = userSchema.omit({ password: true });

const responseAllUsersSchema = z.array(responseUserSchema);

const updateUserSchema = userSchema
  .omit({ admin: true, active: true })
  .partial();

const deleteUserSchema = z.object({ active: z.boolean() });

export {
  userSchema,
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  responseAllUsersSchema,
  deleteUserSchema,
};
