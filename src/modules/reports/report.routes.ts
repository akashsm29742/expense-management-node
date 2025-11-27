// src/modules/reports/report.routes.ts
import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { exportExpensesReport, listExpensesReport } from "./report.controller";
import { requirePermission } from "../../middleware/permission";
import { PERMISSIONS } from "../../auth/permissions";

const router = Router();

router.get(
  "/expenses",
  requireAuth,
  requirePermission(
    PERMISSIONS.VIEW_TEAM_EXPENSES,
    PERMISSIONS.VIEW_ALL_EXPENSES
  ),
  listExpensesReport
);

router.get(
  "/expenses/export",
  requireAuth,
  requirePermission(PERMISSIONS.EXPORT_REPORTS),
  exportExpensesReport
);

export default router;
