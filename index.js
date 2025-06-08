import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI= process.env.MONGODB_URI

//In case not connecting to backend APIs via the url
//const DBUSER= encodeURIComponenet(process.env.DBUSER);
//const DBPASS= encodeURIComponenet(process.env.DBPASS);
//const MONGODB_URI= `mongodb+srv://${DBUSER}:${DBPASS}@cluster0.d874fm8.mongodb.net/gcet?retryWrites=true&w=majority&appName=Cluster0`

app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/orders", orderRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });


export default app;


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

