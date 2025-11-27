import { HttpError } from "../../utils/http-error";
import {
  submitExpense,
  approveExpense,
  rejectExpense,
} from "./expense.service";
import { Request, Response } from "express";

export async function createExpense(req: Request, res: Response) {
  if (!req.user) {
    return new HttpError("Unauthorized", 401);
  }
  const exp = await submitExpense({
    employee: req.user.id,
    ...req.body,
  });
  res.status(201).json(exp);
}

export async function approveExpenseHandler(req: Request, res: Response) {
  if (!req.user) {
    return new HttpError("Unauthorized", 401);
  }
  const exp = await approveExpense(req.params.id, req.user?.id);
  res.json(exp);
}

export async function rejectExpenseHandler(req: Request, res: Response) {
  if (!req.user) {
    return new HttpError("Unauthorized", 401);
  }
  const exp = await rejectExpense(req.params.id, req.user?.id);
  res.json(exp);
}
