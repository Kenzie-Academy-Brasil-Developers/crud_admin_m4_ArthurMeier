import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyUserIsAdminOrHimself = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals.token;
  const userId: number = parseInt(req.params.id);
  const tokenId: number = parseInt(res.locals.token.id);

  if (admin === false) {
    if (userId === tokenId) {
      return next();
    }

    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default verifyUserIsAdminOrHimself;
