import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.listen(8080,()=>{
  mongoose.connect("mongodb://localhost:27017/gcet");
  console.log("Server Started");
});

const userSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
});

const user= mongoose.model("User", userSchema);

const productSchema = mongoose.Schema({
  name: {type: String},
  price: {type: Number},
});

const product= mongoose.model("Product", productSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
  /**return res.send(`<h1>Welcome to the API Index</h1>
    <ol>
      <li><a href="/greet">/greet</a></li>
      <li><a href="/name">/name</a></li>
      <li><a href="/weather">/weather</a></li>
      <li><a href="/products">/products</a></li>
      <li><a href="/register">/register</a></li>
      <li><a href="/login">/login</a></li>
    </ol>
  `);**/
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

app.get("/products", async(req, res)=>{
  const result= await product.find();
  return res.json(result);
});

app.post("/register", async(req, res)=>{
  const {name, email, password} = req.body;
  const result= await user.insertOne({name, email, password});
  return res.json(result);
});

app.post("/login", async(req, res)=>{
  const {email, password} = req.body;
  const result= await user.findOne({email, password});
  if (result) {
      return res.json(result);
    } else {
      return res.json({ status: "Invalid User or Password" });
    }
});
