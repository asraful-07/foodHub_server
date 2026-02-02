import { Request, Response } from "express";
import {
  AddToCartService,
  GetMyCartService,
  RemoveCartItemService,
  ClearCartService,
} from "./cart.service";

export const AddToCartController = async (req: Request, res: Response) => {
  const user = req.user; // authMiddleware থেকে
  const { mealId, quantity } = req.body;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  }

  const result = await AddToCartService(user.id, mealId, quantity || 1);

  res.status(201).json({
    success: true,
    message: "Meal added to cart",
    data: result,
  });
};

export const GetMyCartController = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  }

  const result = await GetMyCartService(user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const RemoveCartItemController = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  }

  const result = await RemoveCartItemService(user.id, req.params.id as string);

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    data: result,
  });
};

export const ClearCartController = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user" });
  }

  const result = await ClearCartService(user.id);

  res.status(200).json({
    success: true,
    message: "Cart cleared",
    data: result,
  });
};
