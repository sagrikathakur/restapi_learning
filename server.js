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

// products dummy data//
let products = [
  {
    id: 1,
    name: "purse",
    price: 120,
    stock: 1,
    brand: "lalitha",
    color: "brown"
  },
  {
    id: 2,
    name: "lip-gloss",
    price: 12,
    stock: 5,
    brand: "suggu-puggu",
    color: "pink"
  },
  {
    id: 3,
    name: "mascara",
    price: 1211,
    stock: 50,
    brand: "chanel",
    color: "black"
  },

]
// get//
app.get("/users", (req, res) => {
  res.send('hello world')
})
// post//
// app.post('/product/:id', (req, res) => {
//   const products = req.body;
//   console.log(products);
//   // server response//
//   res.status(201).json({
//     message: "product created",
//     data: products
//   })
// })
// put //
// app.put("/product/:id", (req, res) => {
//   const id = req.params.id;
//   res.json({
//     productId: id

//   })
// })
// patch for users//
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

// patch for products//
app.patch("/productss/:id", (req, res) => {
  const id = Number(req.params.id);
  const myBag = products.find(products => products.id === id);
  if (!myBag) {
    return res.status(404).json({
      message: "error error this is error in mankind"
    })
  }
  Object.assign(myBag, req.body)
  res.status(200).json({
    message: "updated"
  })
})





app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})