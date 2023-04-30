import { QueryResult } from "pg";
import { IUser, TUserResponse } from "../../intefaces/users.interfaces";
import { client } from "../../database";
import { responseAllUsersSchema } from "../../schemas/users.schemas";

const listAllUsersService = async (): Promise<Array<TUserResponse>> => {
  const queryString: string = `
        SELECT 
            *
        FROM
            users;
    `;

  const queryResult: QueryResult<IUser> = await client.query(queryString);

  const listUsers: TUserResponse[] = responseAllUsersSchema.parse(
    queryResult.rows
  );

  return listUsers;
};

export default listAllUsersService;
