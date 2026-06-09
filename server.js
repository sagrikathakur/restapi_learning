import express from "express";
import dotenv from "dotenv";
import { pool } from './db.js'

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log("server is running on port")
})