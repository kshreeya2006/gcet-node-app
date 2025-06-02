import express from 'express'
import cors from 'cors'

const app = express();
app.listen(8080,()=>{
  console.log("Server Started");
});

app.use(cors());

app.get("/", (req, res)=>{
  return res.send("Good Morning!!");
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
})