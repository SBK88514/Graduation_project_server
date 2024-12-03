import { Router } from "express";
import { signin } from "../controllers/admin.controller"

const router = Router();




router.post("/signin", signin);


export default router;
