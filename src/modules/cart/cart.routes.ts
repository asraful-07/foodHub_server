import express from "express";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";
import {
  AddToCartController,
  GetMyCartController,
  RemoveCartItemController,
  ClearCartController,
} from "./cart.controller";

const cartRotes = express.Router();

cartRotes.post("/", authMiddleware(UserRole.CUSTOMER), AddToCartController);
cartRotes.get("/", authMiddleware(UserRole.CUSTOMER), GetMyCartController);
cartRotes.delete(
  "/item/:id",
  authMiddleware(UserRole.CUSTOMER),
  RemoveCartItemController,
);
cartRotes.delete(
  "/clear",
  authMiddleware(UserRole.CUSTOMER),
  ClearCartController,
);

export default cartRotes;
