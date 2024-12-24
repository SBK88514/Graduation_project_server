import { Router } from "express";
import queries from "../controllers/issues.controller.js";
import upload from "../middleware/upload.js";
const router = Router();
const { addIssues, getAllIssues, autocompleteIssue, updateIssue, associateEmployeeWithIssue } = queries;

router.post("/addIssues", upload.array("issue_images", 12), addIssues);
router.get("/getallissues", getAllIssues);
router.get("/autocomplete", autocompleteIssue);
router.put("/updateissue", associateEmployeeWithIssue);
router.put("/update/:id", updateIssue);

export default router;
