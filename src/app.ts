import express from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import router from "./routes";
import { Request, Response } from "express";

export const app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "*",
    credentials: true,
  }),
);
app.use(express.json());

//* Routes
app.all("/api/auth/*split", toNodeHandler(auth));
app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "FoodHub API is running",
  });
});
