import { z } from "zod";
import {
  userSchema,
  requestUserSchema,
  responseUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../schemas/users.schemas";
import { type } from "os";

type IUser = z.infer<typeof userSchema>;

type TUserRequest = z.infer<typeof requestUserSchema>;

type TUserResponse = z.infer<typeof responseUserSchema>;

type TUserUpdate = z.infer<typeof updateUserSchema>;

type TUserDelete = z.infer<typeof deleteUserSchema>;

export { IUser, TUserResponse, TUserRequest, TUserUpdate, TUserDelete };
