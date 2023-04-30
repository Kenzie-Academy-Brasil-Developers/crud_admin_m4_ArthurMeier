import { Request, Response } from "express";
import { TloginRequest, TloginResponse } from "../intefaces/login.interfaces";
import createLoginService from "../services/login/login.service";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TloginRequest = req.body;
  const token: TloginResponse = await createLoginService(userData);

  return res.status(200).json(token);
};

export { createLoginController };
