import { IUser, TUserResponse } from "../../intefaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";

const retrieveUserService = async (user: IUser): Promise<TUserResponse> => {
  const userResponse = responseUserSchema.parse(user);

  return userResponse;
};

export default retrieveUserService;
