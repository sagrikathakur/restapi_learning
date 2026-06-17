import { Router } from "express";
import * as productController from "../controllers/productController.js";

const router = Router();

router.get("/:id", productController.getProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
