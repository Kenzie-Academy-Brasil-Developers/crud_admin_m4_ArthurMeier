import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals;

  if (admin == false) {
    return res.status(403).json({
      message: "Insufficient Permission",
    });
  }

  return next();
};

export default verifyUserIsAdmin;
