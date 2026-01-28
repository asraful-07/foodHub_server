import express from "express";
import providerRoutes from "../modules/provider/provider.routes";
import categoriesRoutes from "../modules/categories/categories.routes";
import mealRoutes from "../modules/meal/meal.routes";

const router = express.Router();

router.use("/provider", providerRoutes);
router.use("/categories", categoriesRoutes);
router.use("/meal", mealRoutes);

export default router;
