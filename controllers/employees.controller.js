import jwt from "jsonwebtoken";
import employeeModel from "../models/employee.model.js";
import { compare } from "bcrypt";
import transporter from "../service/nodemailer.service.js";

export default {
  employeeSignUp: async (req, res) => {
    try {
      const { employeeName, employeeEmail, employeePassword } = req.body;
      if (!employeeName || !employeeEmail || !employeePassword) {
        throw new Error("all field required");
      }
      const employee = await employeeModel.create(req.body);
      await transporter.sendMail({
        from: "biton123654@gmail.com",
        to: `${employeeEmail}`,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `
                        <div>
                        <span>for validate Email please click in the button => </span>
                        <a href="http://localhost:3000/users/validationEmail/${employee._id}">click me</a>
                        </div>`,
      });

      res.status(200).json({
        success: true,
        message: true,
        employee,
      });
    } catch (error) {
      if (error.code === 11000) {
        error.message = "Email already exists!";
      }
      res.status(401).json({
        success: false,
        message: false,
        error: error.message || error,
      });
    }
  },
  validateEmail: async (req, res) => {
    try {
      const { id } = req.params;
      await employeeModel.findByIdAndUpdate(id, { verify: true });
      return res.json("the validaition is complited successfuly");
    } catch (error) {
      return res.json(
        "Error in the verification process. Please contact support"
      );
    }
  },

  employeeSignIn: async (req, res) => {
    try {
      const { employeeEmail, employeePassword } = req.body;
      const employee = await employeeModel.findOne({ employeeEmail });
      if (!employee) {
        throw new Error("Email not exist");
      }
      const isPassworvalid = compare(
        employeePassword,
        employee.employeePassword
      );
      if (!isPassworvalid) {
        throw new Error("the password not match");
      }
      const newEmployee = await employeeModel.create(employee);
      const token = jwt.sign({ ...newEmployee }, process.env.JWT_SECRET, {
        expiresIn: 60 * 1 * 1,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 1 * 1,
      });

      res.status(200).json({
        success: true,
        message: true,
        error: error.message || error,
      });
    } catch (error) {
      res.status(401).json({
        success: true,
        message: true,
        error: error,
      });
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const employee = req.body;
      const employeeUpdated = await employeeModel.findByIdAndUpdate(
        id,
        employee,
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: true,
        employeeUpdated,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: false,
        error: error || error.message,
      });
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;
      const employeeDeleted = await employeeModel.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: true,
        employeeDeleted,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: false,
        error: error || error.message,
      });
    }
  },
  getAllEmployees: async (req, res) => {
    try {
      const allEmployees = await employeeModel.find();
      res.status(200).json({
        success: true,
        message: true,
        allEmployees,
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: false,
        error: error || error.message,
      });
    }
  },
};
