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
});

const user= mongoose.model("User", userSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
  return res.send(`<h1>Welcome to the API Index</h1>
    <ol>
      <li><a href="/greet">/greet</a></li>
      <li><a href="/name">/name</a></li>
      <li><a href="/weather">/weather</a></li>
      <li><a href="/products">/products</a></li>
      <li><a href="/register">/register</a></li>
    </ol>
  `);
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

app.get("/products", (req, res)=>{
  const products=[
    {name: "Product1", price:45},
    {name: "Product2", price:50},
    {name: "Product3", price:60},
  ];
  res.json(products);
});

app.post("/register", async(req, res)=>{
  const {name} = req.body;
  const result= await user.insertOne({name});
  return res.json(result);
});