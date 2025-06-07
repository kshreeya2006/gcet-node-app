import express from 'express';
import bcrypt from 'bcryptjs';
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const SECRET_KEY= "helloworld";
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({ name, email, password: hashpassword });
    return res.json(result);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userModel.findOne({ email });
    if (!result) return res.status(400).json({ message: "Invalid user" });

    const matchPassword = await bcrypt.compare(password, result.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    return res.json({ user: result, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

userRouter.get("/:id", async(req, res) => {
  try {
    const email = req.params.id;
    const result = await userModel.findOne({ email });
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

userRouter.get("/:id/name", async(req, res) => {
  try {
    const email = req.params.id;
    const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user name" });
  }
});

export default userRouter;
