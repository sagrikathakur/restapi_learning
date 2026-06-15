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

// Get all products
app.get('/bag', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM myproducts ORDER BY id ASC');
    res.status(200).json({
      message: "Products retrieved successfully",
      products: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get a single product by id
app.get('/bag/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const result = await pool.query('SELECT * FROM myproducts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Product with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update a product by id
app.put('/bag/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    // Require at least one field to update
    if (!name && (price === undefined || price === null)) {
      return res.status(400).json({
        message: "Validation error: At least 'name' or 'price' must be provided to update.",
      });
    }

    // Build query dynamically based on provided fields
    let query = "UPDATE myproducts SET ";
    const values = [];
    let paramIndex = 1;

    if (name !== undefined && name !== null) {
      query += `name = $${paramIndex}, `;
      values.push(name);
      paramIndex++;
    }

    if (price !== undefined && price !== null) {
      query += `price = $${paramIndex}, `;
      values.push(price);
      paramIndex++;
    }

    // Remove trailing comma and space
    query = query.slice(0, -2);

    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Product with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete a product by id
app.delete('/bag/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const result = await pool.query('DELETE FROM myproducts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Product with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
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