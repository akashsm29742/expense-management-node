// src/routes.ts
import { Router, RequestHandler } from "express";

import authRoutes from "./modules/auth/auth.routes";
import expenseRoutes from "./modules/expenses/expense.routes";
import reportRoutes from "./modules/reports/report.routes";
import adminUserRoutes from "./modules/users/user.routes";
import categoryRoutes from "./modules/categories/category.routes";
import roleRoutes from "./modules/roles/role.routes";

export interface AppRoute {
  path: string;
  router: Router;
  middlewares?: RequestHandler[]; // optional per-route middlewares if you want
}

export const routes: AppRoute[] = [
  {
    path: "/api/auth",
    router: authRoutes,
  },
  {
    path: "/api/expenses",
    router: expenseRoutes,
  },
  {
    path: "/api/reports",
    router: reportRoutes,
  },
  { path: "/api/admin/categories", router: categoryRoutes },
  {
    path: "/api/admin/users",
    router: adminUserRoutes,
  },
  { path: "/api/admin/roles", router: roleRoutes },
];
