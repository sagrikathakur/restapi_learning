import express from "express";
import dotenv from "dotenv";
import { pool } from './db.js'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

// post//
app.post('/bag', async (req, res) => {
  try {
    const { name, price } = req.body;

    // Validate request body
    if (!name || price === undefined || price === null) {
      return res.status(400).json({
        message: "Validation error: 'name' and 'price' are required fields.",
      });
    }

    const result = await pool.query(
      `INSERT INTO myproducts(name, price)
       VALUES($1, $2)
       RETURNING *`,
      [name, price]
    );

    res.status(201).json({
      message: "Product created",
      product: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})