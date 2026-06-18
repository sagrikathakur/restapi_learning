import { Router } from "express";
import * as vegetableController from "../controllers/vegetableController.js";

const router = Router();

router.post("/", vegetableController.createVeggie);
router.get("/", vegetableController.getAllVeggies);

export default router;
