import format from "pg-format";
import { TUserResponse, TUserUpdate } from "../../intefaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userId: number,
  userData: TUserUpdate
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
      UPDATE users
          SET (%I) = ROW(%L)
      WHERE
          id = $1
      RETURNING *;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const user: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default updateUserService;
