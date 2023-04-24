import format from "pg-format";
import {
  TUserResponse,
  TUserResquest,
  TUserUpdate,
} from "../../intefaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const updateUserService = async (
  userId: number,
  userData: TUserUpdate
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
        UPDATE
            users
        WHERE
            id=$1
        RETURNING *
    `,
    Object.keys(userData),
    Object.keys(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};

export default updateUserService;
