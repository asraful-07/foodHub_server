import express from "express";
import {
  GetStatsController,
  GetsUserController,
  GetUserController,
  UpdateUserController,
} from "./user.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", authMiddleware(UserRole.ADMIN), GetsUserController);
userRoutes.get(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  GetUserController,
);

userRoutes.patch(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.PROVIDER, UserRole.CUSTOMER),
  UpdateUserController,
);

//* statics
userRoutes.get("/statics", GetStatsController);

export default userRoutes;
