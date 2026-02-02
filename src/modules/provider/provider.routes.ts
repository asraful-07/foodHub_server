import express from "express";
import {
  CreateProviderController,
  GetProviderController,
  GetsProviderController,
} from "./provider.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const providerRoutes = express.Router();

providerRoutes.post(
  "/",
  authMiddleware(UserRole.PROVIDER),
  CreateProviderController,
);
providerRoutes.get("/", GetsProviderController);
providerRoutes.get("/:id", GetProviderController);

export default providerRoutes;
