import { RequestHandler } from "express";
import {
  CreateProviderService,
  GetProviderService,
  GetsProviderService,
} from "./provider.service";

export const CreateProviderController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const provider = await CreateProviderService({
      ...req.body,
      userId: user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Created successfully provider",
      data: provider,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsProviderController: RequestHandler = async (req, res) => {
  try {
    const provider = await GetsProviderService();
    res.status(200).json({
      success: true,
      message: "Fetch successfully provider",
      data: provider,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetProviderController: RequestHandler = async (req, res) => {
  try {
    const provider = await GetProviderService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Fetch successfully provider",
      data: provider,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
