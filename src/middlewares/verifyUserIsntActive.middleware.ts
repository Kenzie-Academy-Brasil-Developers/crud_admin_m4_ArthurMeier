import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { QueryConfig, QueryResult } from "pg";
import { IUser } from "../intefaces/users.interfaces";
import { client } from "../database";

const verifyUserIsntActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(res.locals.token.id);

  const queryString: string = `
      SELECT
          *
      FROM
        users
      WHERE
        id=$1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  const user = queryResult.rows[0];

  if (user.active === true) {
    return next();
  }

  throw new AppError("Wrong email/password", 401);
};

export default verifyUserIsntActive;
