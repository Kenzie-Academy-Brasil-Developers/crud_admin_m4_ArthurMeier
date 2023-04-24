import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../error";
import { NextFunction, Response, Request } from "express";
import { client } from "../database";
import { IUser } from "../intefaces/users.interfaces";

const verifyIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = parseInt(req.params.id);

  const queryString: string = `
  SELECT
      *
  FROM
      developers
  WHERE
      id=$1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  res.locals.user = queryResult.rows[0];

  return next();
};

export default verifyIdExists;
