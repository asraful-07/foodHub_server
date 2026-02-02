import express from "express";
import {
  CrateCategoriesController,
  DeleteCategoriesController,
  GetCategoriesController,
  GetsCategoriesController,
  UpdateCategoriesController,
} from "./categories.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const categoriesRoutes = express.Router();

categoriesRoutes.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  CrateCategoriesController,
);
categoriesRoutes.get("/", GetsCategoriesController);
categoriesRoutes.get("/:id", GetCategoriesController);
categoriesRoutes.put(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  UpdateCategoriesController,
);
categoriesRoutes.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  DeleteCategoriesController,
);

export default categoriesRoutes;
