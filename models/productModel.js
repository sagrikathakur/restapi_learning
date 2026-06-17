import { pool } from "../db.js";

export const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM myproducts WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateProduct = async (id, { name, price }) => {
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
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query('DELETE FROM myproducts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
