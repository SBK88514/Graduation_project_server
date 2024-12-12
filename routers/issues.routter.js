import { Router } from "express";
import queries from "../controllers/issues.controller.js";
import upload from "../middleware/upload.js";
const router = Router();
const { addIssues, getAllIssues } = queries;

router.post("/addIssues", upload.array("issue_images", 12), addIssues);
router.get("/getallissues", getAllIssues);

export default router;
