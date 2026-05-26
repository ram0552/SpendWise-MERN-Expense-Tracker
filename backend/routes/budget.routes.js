import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  createBudget,
  getBudgets,
  getBudgetInsights,
} from "../controllers/budget.controller.js";

const router = express.Router();

router.post("/", protect, createBudget);

router.get("/", protect, getBudgets);
router.get(
  "/insights",
  protect,
  getBudgetInsights
);

export default router;