import { RequestHandler } from "express";
import {
  CrateCategoriesService,
  DeleteCategoriesService,
  GetCategoriesService,
  GetsCategoriesService,
  UpdateCategoriesService,
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

export const GetCategoriesController: RequestHandler = async (req, res) => {
  try {
    const categories = await GetCategoriesService(req.params.id as string);

    res.status(201).json({
      success: true,
      message: "Fetch successfully Categories",
      data: categories,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateCategoriesController: RequestHandler = async (req, res) => {
  try {
    const categories = await UpdateCategoriesService(
      req.params.id as string,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Updated successfully Categories",
      data: categories,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeleteCategoriesController: RequestHandler = async (req, res) => {
  try {
    await DeleteCategoriesService(req.params.id as string);

    res.status(201).json({
      success: true,
      message: "Deleted successfully Categories",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
