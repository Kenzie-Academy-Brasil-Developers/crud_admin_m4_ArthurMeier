import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";
import { TUserResponse } from "../../intefaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const recoverUserService = async (id: number) => {
  const queryString: string = `
      UPDATE users
       SET active = true
      WHERE
        id = $1
      RETURNING *
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  const user: TUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default recoverUserService;
