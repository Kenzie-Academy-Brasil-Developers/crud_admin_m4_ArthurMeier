import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import {
  TUserResponse,
  TUserRequest,
  TUserUpdate,
} from "../intefaces/users.interfaces";
import listAllUsersService from "../services/users/listAllUsers.service";
import retrieveUserService from "../services/users/retrieveUsers.service";
import updateUserService from "../services/users/updateUser.service";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;
  const newUser: TUserResponse = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return res.json(users);
};

const retriveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await retrieveUserService(res.locals.user);

  return res.json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TUserUpdate = req.body;

  const upadateUser = updateUserService(userId, userData);

  return res.json(upadateUser);
};

export {
  createUsersController,
  listAllUsersController,
  retriveUserController,
  updateUserController,
};
