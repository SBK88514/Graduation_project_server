import { Router } from "express";
import queries from "../controllers/manager.controller.js";

const router = Router();
const { signIn, signUp } = queries;

router.post("/signin", signIn);
router.post("/signin", signUp);

export default router;
