import express from "express";
import dotenv from "dotenv";
import { pool } from './db.js'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

// dummy data//
let users = [
  {
    id: 1,
    name: "sambhu",
    email: "sambhu@gmail.com",
    age: 80
  },
  {
    id: 2,
    name: "manish",
    email: "manish@gmail.com",
    age: 23
  },
  {
    id: 3,
    name: "sagar",
    email: "sagar@gmail.com",
    age: 44
  }
];

// get//
app.get("/users", (req, res) => {
  res.send('hello world')
})
// post//
app.post('/product', (req, res) => {
  const products = req.body;
  console.log(products);
  // server response//
  res.status(201).json({
    message: "product created",
    data: products
  })
})
// put //
app.put("/product/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    productId: id

  })
})
// patch//
app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(users => users.id === id);
  if (!user) {
    return res.status(404).json({
      message: "user not found"
    })
  }

  Object.assign(user, req.body);

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});



app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})