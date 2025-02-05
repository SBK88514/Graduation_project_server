import jwt from "jsonwebtoken";
import employeeModel from "../models/employee.model.js";
import managerModel from "../models/manager.model.js";
import { compare } from "bcrypt";

async function signInUser(email, password, userType) {
    let userModel = userType === "employee" ? employeeModel : managerModel;
    let emailField = userType === "employee" ? "employeeEmail" : "manager_email";
    let passwordField = userType === "employee" ? "employeePassword" : "manager_password";
  
 

  const user = await userModel
    .findOne({ [emailField]: email })
    .select(`+${passwordField}`);

  if (!user) {
    throw new Error("User not found");
  }
  console.log("🔥 User from DB:", user); // 🔍 בדיקה מה מוחזר מהמסד נתונים
  
  const isPasswordValid = await compare(
    password, user[passwordField]);

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign({ ...user.toObject() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const {
    [passwordField]: _,
    ...userWithoutPassword
  } = user.toObject();
  console.log("🔥 User being returned:", userWithoutPassword); // 🔍 בדוק שהשדה `employeeName` קיים
  return { token, user: userWithoutPassword };
}

export { signInUser };
