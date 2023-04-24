import { Router } from "express";
import {
  createUsersController,
  listAllUsersController,
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
  verifyIdExists,
  verifyTokenExist,
  retriveUserController
);

userRoutes.patch(
  "/id",
  verifyTokenExist,
  verifyBodyIsValid(updateUserSchema),
  verifyIdExists,
  updateUserController
);

userRoutes.put(
  "/:id/recover",
  verifyTokenExist,
  verifyIdExists,
  verifyUserIsActive,
  verifyUserIsAdmin
);

userRoutes.delete("/:id", verifyTokenExist, verifyIdExists);

export default userRoutes;
