import express from "express";
import { CreateProviderController } from "./provider.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const providerRoutes = express.Router();

providerRoutes.post(
  "/",
  authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.PROVIDER),
  CreateProviderController,
);

export default providerRoutes;
