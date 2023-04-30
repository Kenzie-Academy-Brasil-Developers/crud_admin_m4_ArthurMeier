import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  listAllUsersController,
  recoverUserController,
  retriveUserController,
  updateUserController,
} from "../controllers/users.controllers";
import verifyEmailExists from "../middlewares/verifyEmailExists.middleware";
import verifyIdExists from "../middlewares/verifyIdExistx.middleware";
import verifyBodyIsValid from "../middlewares/verifyBodyIsValid.middleware";
import { requestUserSchema, updateUserSchema } from "../schemas/users.schemas";
import verifyTokenExist from "../middlewares/verifyTokenExists.middleware";
import verifyUserIsAdmin from "../middlewares/verifyUserIsAdmin.middleware";
import verifyUserIsActive from "../middlewares/verifyUserIsActive.middleware";
import verifyIdExistsFromParams from "../middlewares/verifyIdExistFromParams.middleware";
import verifyUserIsAdminOrHimself from "../middlewares/VerifyUserIsAdminOrHimself.middleware";
import verifyUserIsntActive from "../middlewares/verifyUserIsntActive.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyBodyIsValid(requestUserSchema),
  verifyEmailExists,
  createUsersController
);

userRoutes.get("", verifyTokenExist, verifyUserIsAdmin, listAllUsersController);

userRoutes.get(
  "/profile",
  verifyTokenExist,
  verifyIdExists,
  retriveUserController
);

userRoutes.patch(
  "/:id",
  verifyTokenExist,
  verifyIdExistsFromParams,
  verifyBodyIsValid(updateUserSchema),
  verifyUserIsAdminOrHimself,
  updateUserController
);

userRoutes.put(
  "/:id/recover",
  verifyTokenExist,
  verifyIdExists,
  verifyUserIsAdmin,
  verifyUserIsActive,
  recoverUserController
);

userRoutes.delete(
  "/:id",
  verifyTokenExist,
  verifyIdExistsFromParams,
  verifyUserIsntActive,
  verifyUserIsAdminOrHimself,
  deleteUserController
);

export default userRoutes;
