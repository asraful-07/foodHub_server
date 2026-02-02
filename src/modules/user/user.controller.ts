import { RequestHandler } from "express";
import {
  GetsUserService,
  GetUserService,
  StatsService,
  UpdateUserService,
} from "./user.service";

export const GetsUserController: RequestHandler = async (req, res) => {
  try {
    const user = await GetsUserService();

    res
      .status(200)
      .json({ success: true, message: "User fetch successfully", data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetUserController: RequestHandler = async (req, res) => {
  try {
    const user = await GetUserService(req.params.id as string);

    res
      .status(200)
      .json({ success: true, message: "User fetch successfully", data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateUserController: RequestHandler = async (req, res) => {
  try {
    const user = await UpdateUserService(req.params.id as string, req.body);

    res
      .status(200)
      .json({ success: true, message: "User update successfully", data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetStatsController: RequestHandler = async (req, res) => {
  try {
    const stats = await StatsService();

    console.log("Stats:", stats);
    res.status(200).json({
      success: true,
      message: "Successfully fetch statics",
      data: stats,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
