import { Router } from "express";
import * as stoneController from "../controllers/stoneController.js";

const router = Router();

router.post("/", stoneController.createStone);
router.get("/", stoneController.getAllStones);
router.put("/:id", stoneController.updateStone);
router.delete("/:id", stoneController.deleteStone);

export default router;
