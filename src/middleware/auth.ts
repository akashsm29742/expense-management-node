import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { HttpError } from "../utils/http-error";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new HttpError("Invalid credentials", 401);

  try {
    const payload = jwt.verify(token, env.jwtSecret) as any;
    req.user = payload;
    next();
  } catch {
    return new HttpError("Invalid token", 401);
  }
}
