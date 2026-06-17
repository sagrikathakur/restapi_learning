import * as stoneModel from "../models/stoneModel.js";

export const createStone = async (req, res) => {
  try {
    const { stone_name, color, weight_carat, price, origin_country } = req.body;

    if (!stone_name || !color || !weight_carat || !price || !origin_country) {
      return res.status(400).json({
        message: "all fields are required"
      });
    }

    const stone = await stoneModel.createStone({
      stone_name,
      color,
      weight_carat,
      price,
      origin_country
    });

    res.status(201).json({
      message: "stone created",
      stone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllStones = async (req, res) => {
  try {
    const products = await stoneModel.getAllStones();
    res.status(200).json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
