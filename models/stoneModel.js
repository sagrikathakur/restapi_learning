import { pool } from "../db.js";

export const createStone = async ({ stone_name, color, weight_carat, price, origin_country }) => {
  const result = await pool.query(
    `INSERT INTO preciousStone(
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
  return result.rows[0];
};

export const getAllStones = async () => {
  const result = await pool.query('SELECT * FROM preciousStone ORDER BY id ASC');
  return result.rows;
};

export const updateStone = async (id, { stone_name, color, weight_carat, price, origin_country }) => {
  let query = "UPDATE preciousStone SET ";
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

  // If no fields are provided to update, return null
  if (values.length === 0) {
    return null;
  }

  // Remove trailing comma and space
  query = query.slice(0, -2);

  query += ` WHERE id = $${paramIndex} RETURNING *`;
  values.push(id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteStone = async (id) => {
  const result = await pool.query('DELETE FROM preciousStone WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
