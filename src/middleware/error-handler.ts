import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    status: err.status,
  });

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    status,
  });
}
