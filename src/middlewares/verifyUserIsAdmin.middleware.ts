import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals.token;

  if (admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default verifyUserIsAdmin;
