import * as veggieModel from '../models/veggieModel.js';

export const createVeggie = async (req, res) => {
  try {
    const { name, color, price, carbs, origin_country } = req.body;

    if (!name || !color || !price || !carbs || !origin_country) {
      return res.status(400).json({
        message: "all fields are required"
      });
    }

    const veggie = await veggieModel.createMyCart({
      name,
      color,
      price,
      carbs,
      origin_country
    });

    res.status(201).json({
      message: "veggie created",
      veggie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllVeggies = async (req, res) => {
  try {
    const veggies = await veggieModel.getAllVeggie();
    res.status(200).json({
      message: "Veggies retrieved successfully",
      veggies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
