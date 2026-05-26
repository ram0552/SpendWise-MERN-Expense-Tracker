import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  getAnalytics,
  getMonthlyAnalytics,
  getCategoryAnalytics,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getAnalytics
);

router.get(
  "/monthly",
  protect,
  getMonthlyAnalytics
);

router.get(
  "/categories",
  protect,
  getCategoryAnalytics
);

export default router;