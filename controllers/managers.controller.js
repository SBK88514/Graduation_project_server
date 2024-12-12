import { compare } from "bcrypt";
import managerModel from "../models/manager.model.js";
import jwt from "jsonwebtoken";
// import { json } from "express";
// import { assign } from "nodemailer/lib/shared/index.js";

export default {
  signUp: async (req, res) => {
    try {
      const { manager_name, manager_email, manager_password } = req.body;

      if (!manager_name || !manager_email || !manager_password) {
        throw new Error("All fields are required!");
      }

      const manager = await managerModel.create(req.body);

      res.status(200).json({
        success: true,
        message: "Success sign-up manager",
        manager,
      });
    } catch (error) {
      if (error.code === 11000) {
        error.message = "Email already exists!";
      }

      res.status(401).json({
        success: false,
        message: "Sign-up manager failed",
        error: error.message || error,
      });
    }
  },

  signIn: async (req, res) => {
    try {
      const { manager_email, manager_password } = req.body;
      const manager = await managerModel.findOne({
        manager_email: manager_email,
      });
      if (!manager) throw new Error("the manager is not exist");

      const isPasswordValid = await compare(
        manager_password,
        manager.manager_password
      );
      if (!isPasswordValid) throw new Error("the password not valid");

      const token = jwt.sign({ ...manager }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 60,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 1,
      });
      res.status(200).json({
        success: true,
        message: "Success Login manager",
        manager,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        massage: "not Success Login manager",
      });
    }
  },

  Auth: async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Success Auth User",
        user: req.user._doc,
      });
      console.log(req.user);
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "not Success Auth User",
        error: error.message || error,
      });
    }
  },
  logOut: async function (req, res) {
    try {
      res.clearCookie("token", {
        secure: true,
        httpOnly: true,
      });

      return res.json({ success: true, message: "success to signout" });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: "not success to signout" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const manager = req.body;
      const managerUpdated = await managerModel.findByIdAndUpdate(id, manager, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: true,
        managerUpdated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: false,
        error: error || error.message,
      });
    }
  },

  deleteManager: async (req, res) => {
    try {
      const { id } = req.params;
      const managerDeleted = await managerModel.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: true,
        managerDeleted,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: false,
        error: error || error.message,
      });
    }
  },
  getAllManagers: async (req, res) => {
    try {
      const allManagers = await managerModel.find();
      res.status(200).json({
        success: true,
        message: true,
        data: allManagers,
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
