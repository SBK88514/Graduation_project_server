import express from "express";
import {config} from "dotenv"
config()
import mongoDB from "./database/connectDB.js"
mongoDB()

const app = express();
app.use(express.json());

import managerRouter from "./routers/manager.router.js";

app.use("/manager", managerRouter);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
