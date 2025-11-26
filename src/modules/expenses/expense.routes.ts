import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/rbac";
import { createExpense, approveExpenseHandler } from "./expense.controller";

const router = Router();

router.post("/", requireAuth, requireRole("EMPLOYEE"), createExpense);
router.post(
  "/:id/approve",
  requireAuth,
  requireRole("MANAGER"),
  approveExpenseHandler
);

export default router;
