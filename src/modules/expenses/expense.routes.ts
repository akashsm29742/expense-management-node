import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
// import { requireRole } from "../../middleware/rbac";
import { createExpense, approveExpenseHandler } from "./expense.controller";
import { requirePermission } from "../../middleware/permission";
import { PERMISSIONS } from "../../auth/permissions";

const router = Router();

router.post(
  "/",
  requireAuth,
  // requireRole("EMPLOYEE"), !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)
  requirePermission(PERMISSIONS.SUBMIT_EXPENSE), // Comment this and uncomment the above line if you want to restrict to EMPLOYEE role only
  createExpense
);
router.post(
  "/:id/approve",
  requireAuth,
  // requireRole("MANAGER"), !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)
  requirePermission(PERMISSIONS.APPROVE_EXPENSE), // Comment this and uncomment the above line if you want to restrict to MANAGER role only
  approveExpenseHandler
);

export default router;
