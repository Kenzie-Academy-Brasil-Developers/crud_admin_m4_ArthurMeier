import express, { Application, json } from "express";

const app: Application = express();
app.use(json());

app.post("/users");
app.post("/login");
app.get("/users");
app.get("/users/profile");
app.patch("/users/:id");
app.delete("/users/:id");
app.put("/users/:id/recover");

export default app;
