import { Router } from "express";
import queries from "../controllers/issues.controller.js";
import upload from "../middleware/upload.js";
const router = Router();
const { addIssues, getAllIssues, autocompleteIssue } = queries;

router.post("/addIssues", upload.array("issue_images", 12), addIssues);
router.get("/getallissues", getAllIssues);
router.get("/autocomplete", autocompleteIssue);
export default router;
