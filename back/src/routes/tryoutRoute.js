import express from "express";

import * as tryoutController from "../controllers/tryoutController.js";

const router = express.Router();

router.get("/tryout", tryoutController.getTryout);
router.post("/tryout", tryoutController.createTryout);
router.put("/tryout/:id", tryoutController.updateTryout);
router.delete("/tryout/:id", tryoutController.deleteTryout);
router.get("/tryout/search", tryoutController.searchTryout);

export default router;
