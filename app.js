import express from "express";


const app = express();
app.use(express.json());

import adminRouter from "./routers/admin.router";

app.use("/admin", adminRouter);

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
