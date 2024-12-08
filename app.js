import express from "express";
import { config } from "dotenv";
import mongoDB from "./database/connectDB.js";
config();
mongoDB();

const app = express();
app.use(express.json());

import usersRouter from "./routers/users.router.js";

app.use("/users", usersRouter);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
