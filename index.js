import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/orders", orderRouter);

app.listen(8080, () => {
  mongoose.connect("mongodb://localhost:27017/gcet");
  console.log("Server Started");
});


/**app.get("/", (req, res)=>{
  return res.send(`<h1>Welcome to the API Index</h1>
    <ol>
      <li><a href="/greet">/greet</a></li>
      <li><a href="/name">/name</a></li>
      <li><a href="/weather">/weather</a></li>
      <li><a href="/products">/products</a></li>
      <li><a href="/register">/register</a></li>
      <li><a href="/login">/login</a></li>
    </ol>
  `);
   res.send("Good Morning!!");
});

app.get("/greet", (req, res)=>{
  res.send("Greetings!!");
} );

app.get("/name", (req, res)=>{
  res.send("Shreeya");
} );

app.get("/weather", (req, res)=>{
  res.send("29 degrees");
});

**/

