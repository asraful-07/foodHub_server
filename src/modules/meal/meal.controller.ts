import { RequestHandler } from "express";
import { CreateMealService, GetsMealsService } from "./meal.service";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/authMiddleware";

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
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const isAdmin = user.role === UserRole.ADMIN;

    const meal = await GetsMealsService(isAdmin, user?.id);

    res
      .status(200)
      .json({ success: true, message: "Meals fetch successfully", data: meal });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
