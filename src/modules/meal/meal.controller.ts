import { RequestHandler } from "express";
import { CreateMealService } from "./meal.service";
import { prisma } from "../../lib/prisma";

export const CreateMealController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    // ✅ provider profile fetch
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

    // ✅ meal create
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
