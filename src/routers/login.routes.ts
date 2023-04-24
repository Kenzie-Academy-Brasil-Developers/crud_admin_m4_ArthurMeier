import { log } from "console";
import { Router } from "express";
import { createLoginService } from "../controllers/login.controllers";
import verifyEmailExists from "../middlewares/verifyEmailExists.middleware";

const loginRoutes = Router();

loginRoutes.post("", verifyEmailExists, createLoginService);

export default loginRoutes;
