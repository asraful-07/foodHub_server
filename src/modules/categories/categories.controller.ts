import { RequestHandler } from "express";
import {
  CrateCategoriesService,
  GetsCategoriesService,
} from "./categories.service";

export const CrateCategoriesController: RequestHandler = async (req, res) => {
  try {
    const categories = await CrateCategoriesService(req.body);

    res.status(201).json({
      success: true,
      message: "Created successfully Categories",
      data: categories,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsCategoriesController: RequestHandler = async (req, res) => {
  try {
    const categories = await GetsCategoriesService();

    res.status(201).json({
      success: true,
      message: "Fetch successfully Categories",
      data: categories,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
