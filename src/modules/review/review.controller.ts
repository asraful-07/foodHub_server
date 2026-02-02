import { RequestHandler } from "express";
import { CreateReviewServices, GetsReviewServices } from "./review.service";

export const CreateReviewController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }
    const review = await CreateReviewServices({
      ...req.body,
      customerId: user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Review successfully done",
      data: review,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsReviewController: RequestHandler = async (req, res) => {
  try {
    const review = await GetsReviewServices();
    res.status(201).json({
      success: true,
      message: "Review successfully fetch",
      data: review,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
