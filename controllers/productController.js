import * as productModel from "../models/productModel.js";

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const product = await productModel.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: `Product with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
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

    const product = await productModel.updateProduct(id, { name, price });

    if (!product) {
      return res.status(404).json({
        message: `Product with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that id is an integer
    if (isNaN(parseInt(id, 10))) {
      return res.status(400).json({
        message: "Validation error: 'id' must be an integer.",
      });
    }

    const product = await productModel.deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        message: `Product with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
