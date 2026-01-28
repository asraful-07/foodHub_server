import express from "express";
import {
  CrateCategoriesController,
  GetsCategoriesController,
} from "./categories.controller";

const categoriesRoutes = express.Router();

categoriesRoutes.post("/", CrateCategoriesController);
categoriesRoutes.get("/", GetsCategoriesController);

export default categoriesRoutes;
