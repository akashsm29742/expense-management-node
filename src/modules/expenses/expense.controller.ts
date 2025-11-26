import { submitExpense, approveExpense } from "./expense.service";
import { Request, Response } from "express";

export async function createExpense(req: Request, res: Response) {
  const exp = await submitExpense({
    employee: req.user.id,
    ...req.body,
  });
  res.status(201).json(exp);
}

export async function approveExpenseHandler(req: Request, res: Response) {
  const exp = await approveExpense(req.params.id);
  res.json(exp);
}
