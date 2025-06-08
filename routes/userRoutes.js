import express from "express";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userModel.insertOne({
    name: name,
    email: email,
    password: password,
  });
  return res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await userModel.findOne({ email, password });
  if (!result) return res.json({ message: "Invalid user or password" });
  return res.json(result);
  console.log(result)
});



export default userRouter;