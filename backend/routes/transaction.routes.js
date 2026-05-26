import express from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post("/", protect, addTransaction);

router.get("/", protect, getTransactions);

router.put(
  "/:id",
  protect,
  updateTransaction
);

router.delete(
  "/:id",
  protect,
  deleteTransaction
);

export default router;