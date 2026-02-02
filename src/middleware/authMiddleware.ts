import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export enum UserRole {
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER",
  CUSTOMER = "CUSTOMER",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export const authMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized token" });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as UserRole,
      };

      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden token" });
      }

      next();
    } catch (err: any) {
      res.status(403).json({ success: false, message: err.message });
    }
  };
};
