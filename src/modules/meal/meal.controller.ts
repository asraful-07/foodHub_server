import { RequestHandler } from "express";
import {
  CreateMealService,
  DeleteMealsService,
  GetMealsService,
  GetsMealsService,
  GetsProviderMenuService,
  UpdateMealsService,
} from "./meal.service";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/authMiddleware";
import { paginationSort } from "../../helper/paginationSort";
import { DietaryPreference } from "../../generated/prisma/enums";

export const CreateMealController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!providerProfile) {
      return res.status(400).json({
        success: false,
        message:
          "Provider profile not found. Please create provider profile first.",
      });
    }

    const meal = await CreateMealService({
      ...req.body,
      providerId: providerProfile.id,
    });

    res.status(201).json({
      success: true,
      message: "Successfully meal created",
      data: meal,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsMealsController: RequestHandler = async (req, res) => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const dietaryPreference =
      typeof req.query.dietaryPreference === "string"
        ? (req.query.dietaryPreference as DietaryPreference)
        : undefined;

    const cuisine =
      typeof req.query.cuisine === "string" ? req.query.cuisine : undefined;

    const minPrice =
      typeof req.query.minPrice === "string"
        ? Number(req.query.minPrice)
        : undefined;

    const maxPrice =
      typeof req.query.maxPrice === "string"
        ? Number(req.query.maxPrice)
        : undefined;

    const isAvailable =
      req.query.isAvailable === "true"
        ? true
        : req.query.isAvailable === "false"
          ? false
          : undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSort(req.query);

    const result = await GetsMealsService({
      search,
      dietaryPreference,
      cuisine,
      minPrice,
      maxPrice,
      isAvailable,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    return res.status(200).json({
      success: true,
      message: "Meals fetch successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    console.error("Get meals error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch meals",
      error: error.message,
    });
  }
};

export const GetsProviderMenuController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const isAdmin = user.role === UserRole.ADMIN;

    const meal = await GetsProviderMenuService(isAdmin, user?.id);

    res
      .status(200)
      .json({ success: true, message: "Meals fetch successfully", data: meal });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetMealsController: RequestHandler = async (req, res) => {
  try {
    const meal = await GetMealsService(req.params.id as string);

    res
      .status(200)
      .json({ success: true, message: "Meal fetch successfully", data: meal });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateMealsController: RequestHandler = async (req, res) => {
  try {
    const meal = await UpdateMealsService(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: meal,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeleteMealsController: RequestHandler = async (req, res) => {
  try {
    await DeleteMealsService(req.params.id as string);
    res
      .status(200)
      .json({ success: true, message: "Meal Delete successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
