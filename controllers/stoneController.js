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
    const stones = await stoneModel.getAllStones();
    res.status(200).json({
      message: "Stones retrieved successfully",
      stones,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateStone = async (req, res) => {
  try {
    const { id } = req.params;
    const { stone_name, color, weight_carat, price, origin_country } = req.body;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    // Require at least one field to update
    if (!stone_name && !color && (weight_carat === undefined || weight_carat === null) && (price === undefined || price === null) && !origin_country) {
      return res.status(400).json({
        message: "Validation error: At least one field ('stone_name', 'color', 'weight_carat', 'price', or 'origin_country') must be provided to update.",
      });
    }

    const stone = await stoneModel.updateStone(id, { stone_name, color, weight_carat, price, origin_country });

    if (!stone) {
      return res.status(404).json({
        message: `Stone with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Stone updated successfully",
      stone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteStone = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const stone = await stoneModel.deleteStone(id);

    if (!stone) {
      return res.status(404).json({
        message: `Stone with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Stone deleted successfully",
      stone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
