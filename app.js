import express from "express";
import { config } from "dotenv";
import mongoDB from "./database/connectDB.js";

config();
mongoDB();

const app = express();
app.use(express.json());

import managerRouter from "./routers/manager.router.js";
import issuesRouter from "./routers/issues.routter.js";

app.use("/manager", managerRouter);
app.use("/issues", issuesRouter);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
