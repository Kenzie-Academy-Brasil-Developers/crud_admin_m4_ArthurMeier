import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import { requestLoginSchema } from "../schemas/login.schemas";
import verifyBodyIsValid from "../middlewares/verifyBodyIsValid.middleware";
import verifyUserIsActiveFromEmail from "../middlewares/verifyUserIsActiveFromEmail.middleware";
import verifyEmailExistsLogin from "../middlewares/verifyEmailExistsLogin.middleware";
const loginRoutes = Router();

loginRoutes.post(
  "",
  verifyBodyIsValid(requestLoginSchema),
  verifyEmailExistsLogin,
  verifyUserIsActiveFromEmail,
  createLoginController
);

export default loginRoutes;
