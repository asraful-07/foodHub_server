import express from "express";
import {
  CreateOrderController,
  GetOrderController,
  GetsOrderController,
  UpdateOrderController,
} from "./order.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const orderRoutes = express.Router();

orderRoutes.post(
  "/",
  authMiddleware(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  CreateOrderController,
);
orderRoutes.get(
  "/",
  authMiddleware(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  GetsOrderController,
);
orderRoutes.get(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  GetOrderController,
);
orderRoutes.patch(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  UpdateOrderController,
);

export default orderRoutes;
