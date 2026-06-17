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
