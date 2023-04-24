import { z } from "zod";
import {
  requestUserSchema,
  responseUserSchema,
  userSchema,
  updateUserSchema,
} from "../schemas/users.schemas";

type IUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserUpdate = z.infer<typeof updateUserSchema>;

export { IUser, TUserResponse, TUserRequest, TUserUpdate };
