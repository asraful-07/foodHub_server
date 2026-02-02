import express from "express";
import providerRoutes from "../modules/provider/provider.routes";
import categoriesRoutes from "../modules/categories/categories.routes";
import mealRoutes from "../modules/meal/meal.routes";
import orderRoutes from "../modules/order/order.routes";
import userRoutes from "../modules/user/user.routes";
import reviewRoutes from "../modules/review/review.routes";
import cartRotes from "../modules/cart/cart.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/provider", providerRoutes);
router.use("/categories", categoriesRoutes);
router.use("/meals", mealRoutes);
router.use("/order", orderRoutes);
router.use("/cart", cartRotes);
router.use("/review", reviewRoutes);

export default router;
