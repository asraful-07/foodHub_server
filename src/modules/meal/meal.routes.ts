import express from "express";
import {
  CreateMealController,
  DeleteMealsController,
  GetMealsController,
  GetsMealsController,
  GetsProviderMenuController,
  UpdateMealsController,
} from "./meal.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const mealRoutes = express.Router();

mealRoutes.post("/", authMiddleware(UserRole.PROVIDER), CreateMealController);
mealRoutes.get("/", GetsMealsController);
mealRoutes.get(
  "/provider/menu",
  authMiddleware(UserRole.PROVIDER),
  GetsProviderMenuController,
);
mealRoutes.get("/:id", GetMealsController);
mealRoutes.put(
  "/:id",
  authMiddleware(UserRole.PROVIDER),
  UpdateMealsController,
);
mealRoutes.delete("/:id", DeleteMealsController);

export default mealRoutes;
