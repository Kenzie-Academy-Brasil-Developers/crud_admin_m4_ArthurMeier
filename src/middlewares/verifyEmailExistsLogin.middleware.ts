import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { IUser } from "../intefaces/users.interfaces";
import { AppError } from "../error";

type TEmail = {
  email: string;
};

const verifyEmailExistsLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: TEmail = req.body;

  const queryString: string = `
      SELECT
          *
      FROM
        users
      WHERE
        email=$1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  return next();
};

export default verifyEmailExistsLogin;
