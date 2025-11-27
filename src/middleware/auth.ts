import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Permission } from "../auth/permissions";

interface JwtPayload {
  id: string;
  role: string;
  permissions?: Permission[] | [];
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        permissions: Permission[] | [];
      };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : undefined;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    console.log("Authenticated user:", payload);
    req.user = {
      id: payload.id,
      role: payload.role,
      permissions: payload.permissions ?? [],
    };

    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}
