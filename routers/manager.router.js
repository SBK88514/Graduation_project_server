import { Router } from "express";
import queries from "../controllers/manager.controller.js"

const router = Router();
const {signIn} = queries




router.post("/signin", signIn);


export default router;
