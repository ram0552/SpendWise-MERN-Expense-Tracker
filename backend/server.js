import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import budgetRoutes from "./routes/budget.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("SpendWise API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/budget", budgetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});