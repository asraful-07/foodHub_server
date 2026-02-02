import express from "express";
import {
  CreateReviewController,
  GetsReviewController,
} from "./review.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const reviewRoutes = express();

reviewRoutes.post(
  "/",
  authMiddleware(UserRole.CUSTOMER),
  CreateReviewController,
);
reviewRoutes.get("/", GetsReviewController);

export default reviewRoutes;
