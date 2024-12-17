import { Router } from "express";
import query from "../controllers/professions.controller.js";
const router = Router();
const { getAllProfessions, addProfession } = query;

router.get("/getallprofessions", getAllProfessions);
router.post("/addprofession", addProfession);
export default router;
