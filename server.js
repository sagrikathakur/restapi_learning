import express from "express";
import dotenv from "dotenv";
import { pool } from './db.js'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());


app.get("/users", (req, res) => {
  res.send('hello world')
})
app.post('/product', (req, res) => {
  const products = req.body;
  console.log(products);
  // server response//
  res.status(201).json({
    message: "product created",
    data: products
  })
})



app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})