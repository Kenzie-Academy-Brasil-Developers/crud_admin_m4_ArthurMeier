import format from "pg-format";
import {
  TloginRequest,
  TloginResponse,
} from "../../intefaces/login.interfaces";
import { QueryResult } from "pg";
import { IUser } from "../../intefaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (
  payload: TloginRequest
): Promise<TloginResponse> => {
  const queryFormat: string = format(
    `
        SELECT
            *
        FROM
            users
        WHERE
            email=%L;
    `,
    payload.email
  );

  const querResult: QueryResult<IUser> = await client.query(queryFormat);

  const user = querResult.rows[0];

  if (querResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword = await bcrypt.compare(payload.password, user.password);

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY!,
    { expiresIn: process.env.EXPIRES_IN }
  );

  return { token };
};

export default createLoginService;
