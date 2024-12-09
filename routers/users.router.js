import { Router } from "express";
import queries from "../controllers/managers.controller.js";
import queriesEmployees from "../controllers/employees.controller.js";
import varifyToken from "../midlleware/varifyToken.midlleware.js"

const { signIn, signUp, update, deleteManager, getAllManagers, Auth} = queries;
const {
  employeeSignIn,
  employeeSignUp,
  validateEmail,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
} = queriesEmployees;
const router = Router();

//managers
router.post("/manager/signin", signIn);
router.get("/auth",varifyToken,Auth)
router.post("/manager/signup", signUp);
router.put("/manager/update/:id", update);
router.delete("/manager/delete/:id", deleteManager);
router.get("/manager/getallmanagers", getAllManagers);

//employees
router.post("/employee/signin", employeeSignIn);
router.post("/employee/signup", employeeSignUp);
router.get("/validationEmail/:id", validateEmail);
router.put("/employee/update/:id", updateEmployee);
router.delete("/employee/delete/:id", deleteEmployee);
router.get("/manager/getallempolyees", getAllEmployees);

export default router;
