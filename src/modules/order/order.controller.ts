import { RequestHandler } from "express";
import {
  CreateOrderService,
  GetOrderService,
  GetsOrderService,
  UpdateOrderService,
} from "./order.service";

export const CreateOrderController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const order = await CreateOrderService({
      customerId: user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsOrderController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const orders = await GetsOrderService(user?.id, user?.role);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetOrderController: RequestHandler = async (req, res) => {
  try {
    const order = await GetOrderService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Order fetch successfully",
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateOrderController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    const { status } = req.body;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const updatedOrder = await UpdateOrderService(
      req.params.id as string,
      status,
      user,
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
