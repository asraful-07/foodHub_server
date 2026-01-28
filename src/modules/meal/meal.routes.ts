import express from "express";
import { CreateMealController, GetsMealsController } from "./meal.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const mealRoutes = express.Router();

mealRoutes.post("/", authMiddleware(UserRole.PROVIDER), CreateMealController);
mealRoutes.get("/", authMiddleware(UserRole.PROVIDER), GetsMealsController);

export default mealRoutes;
