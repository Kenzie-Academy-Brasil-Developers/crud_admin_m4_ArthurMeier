import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";

const verifyTokenExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    String(process.env.SECRET_KEY!),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }

      res.locals.token = {
        admin: decoded.admin,
        id: decoded.sub,
      };
    }
  );

  return next();
};

export default verifyTokenExist;
