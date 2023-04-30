import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";
import { TUserDelete } from "../../intefaces/users.interfaces";

const deleteUserService = async (id: number) => {
  const queryString: string = `
      UPDATE users
       SET active = false
      WHERE
        id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserDelete> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default deleteUserService;
