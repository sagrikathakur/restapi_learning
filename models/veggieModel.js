import { pool } from "../db.js";

export const createMyCart = async ({
  name,
  color,
  price,
  carbs,
  origin_country
}) => {
  const result = await pool.query(
    `INSERT INTO veggiecart
    (
      name,
      color,
      price,
      carbs,
      origin_country
    )
    VALUES
    ($1,$2,$3,$4,$5)
    RETURNING *
    `, [name, color, price, carbs, origin_country]
  )
  return result.rows[0]
}

// get all the veggies//

export const getAllVeggie = async () => {
  const result = await pool.query('SELECT * FROM veggiecart ORDER BY id ASC');
  return result.rows;
};