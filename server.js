import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

// server instance
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("server is active");
});

// ==========================================
// STONES API ENDPOINTS (preciousstone table)
// ==========================================

// Create a stone
app.post("/stones", async (req, res) => {
  try {
    const { stone_name, color, weight_carat, price, origin_country } = req.body;

    if (!stone_name || !color || !weight_carat || !price || !origin_country) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO preciousstone(
        stone_name,
        color,
        weight_carat,
        price,
        origin_country
      )
       VALUES($1, $2, $3, $4, $5)
       RETURNING *`,
      [stone_name, color, weight_carat, price, origin_country]
    );

    res.status(201).json({
      message: "stone created",
      stone: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all stones
app.get("/stones", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM preciousstone ORDER BY id ASC");
    res.status(200).json({
      message: "Stones retrieved successfully",
      stones: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get a single stone by ID
app.get("/stones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const result = await pool.query("SELECT * FROM preciousstone WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Stone with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Stone retrieved successfully",
      stone: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update a stone by ID
app.put("/stones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { stone_name, color, weight_carat, price, origin_country } = req.body;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    if (
      !stone_name &&
      !color &&
      (weight_carat === undefined || weight_carat === null) &&
      (price === undefined || price === null) &&
      !origin_country
    ) {
      return res.status(400).json({
        message:
          "Validation error: At least one field ('stone_name', 'color', 'weight_carat', 'price', or 'origin_country') must be provided to update.",
      });
    }

    let query = "UPDATE preciousstone SET ";
    const values = [];
    let paramIndex = 1;

    if (stone_name !== undefined && stone_name !== null) {
      query += `stone_name = $${paramIndex}, `;
      values.push(stone_name);
      paramIndex++;
    }

    if (color !== undefined && color !== null) {
      query += `color = $${paramIndex}, `;
      values.push(color);
      paramIndex++;
    }

    if (weight_carat !== undefined && weight_carat !== null) {
      query += `weight_carat = $${paramIndex}, `;
      values.push(weight_carat);
      paramIndex++;
    }

    if (price !== undefined && price !== null) {
      query += `price = $${paramIndex}, `;
      values.push(price);
      paramIndex++;
    }

    if (origin_country !== undefined && origin_country !== null) {
      query += `origin_country = $${paramIndex}, `;
      values.push(origin_country);
      paramIndex++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Stone with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Stone updated successfully",
      stone: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete a stone by ID
app.delete("/stones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const result = await pool.query("DELETE FROM preciousstone WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Stone with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Stone deleted successfully",
      stone: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ==========================================
// VEGGIES API ENDPOINTS (veggiecart table)
// ==========================================

// Create a veggie
app.post("/veggies", async (req, res) => {
  try {
    const { name, color, price, carbs, origin_country } = req.body;

    if (!name || !color || !price || !carbs || !origin_country) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO veggiecart(
        name,
        color,
        price,
        carbs,
        origin_country
      )
       VALUES($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, color, price, carbs, origin_country]
    );

    res.status(201).json({
      message: "veggie created",
      veggie: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all veggies
app.get("/veggies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM veggiecart ORDER BY id ASC");
    res.status(200).json({
      message: "Veggies retrieved successfully",
      veggies: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get a single veggie by ID
app.get("/veggies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const result = await pool.query("SELECT * FROM veggiecart WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Veggie with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Veggie retrieved successfully",
      veggie: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update a veggie by ID
app.put("/veggies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, price, carbs, origin_country } = req.body;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    if (
      !name &&
      !color &&
      (price === undefined || price === null) &&
      (carbs === undefined || carbs === null) &&
      !origin_country
    ) {
      return res.status(400).json({
        message:
          "Validation error: At least one field ('name', 'color', 'price', 'carbs', or 'origin_country') must be provided to update.",
      });
    }

    let query = "UPDATE veggiecart SET ";
    const values = [];
    let paramIndex = 1;

    if (name !== undefined && name !== null) {
      query += `name = $${paramIndex}, `;
      values.push(name);
      paramIndex++;
    }

    if (color !== undefined && color !== null) {
      query += `color = $${paramIndex}, `;
      values.push(color);
      paramIndex++;
    }

    if (price !== undefined && price !== null) {
      query += `price = $${paramIndex}, `;
      values.push(price);
      paramIndex++;
    }

    if (carbs !== undefined && carbs !== null) {
      query += `carbs = $${paramIndex}, `;
      values.push(carbs);
      paramIndex++;
    }

    if (origin_country !== undefined && origin_country !== null) {
      query += `origin_country = $${paramIndex}, `;
      values.push(origin_country);
      paramIndex++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Veggie with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Veggie updated successfully",
      veggie: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete a veggie by ID
app.delete("/veggies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const result = await pool.query("DELETE FROM veggiecart WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Veggie with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Veggie deleted successfully",
      veggie: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Error-handling middleware for invalid/empty JSON request bodies
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }
  next();
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;