import express from "express";
import { CreateMealController } from "./meal.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const mealRoutes = express.Router();

mealRoutes.post("/", authMiddleware(UserRole.PROVIDER), CreateMealController);

export default mealRoutes;
