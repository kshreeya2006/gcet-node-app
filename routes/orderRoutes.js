import express from "express";
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/new", async (req, res) => {
  const { email, orderValue } = req.body;
  try {
    const result = await orderModel.create({ email, orderValue }); // fixed here
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create order", error });
  }
});

orderRouter.get("/:id", async (req, res) => {
  const email = req.params.id;
  try {
    const result = await orderModel.find({ email });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

orderRouter.get("/all", async (req, res) => {
  try {
    const result = await orderModel.find();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch all orders", error });
  }
});

export default orderRouter;
