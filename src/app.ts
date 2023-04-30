import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from "express";
import userRoutes from "./routers/users.routes";
import { handleErrors } from "./error";
import loginRoutes from "./routers/login.routes";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleErrors);

app.post("/users");
app.post("/login");
app.get("/users");
app.get("/users/profile");
app.patch("/users/:id");
app.delete("/users/:id");
app.put("/users/:id/recover");

export default app;
