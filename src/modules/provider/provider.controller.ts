import { RequestHandler } from "express";
import { CreateProviderService } from "./provider.service";

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
