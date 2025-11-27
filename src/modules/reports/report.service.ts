// src/modules/reports/report.service.ts
import { Expense, IExpense } from "../expenses/expense.model";
import { User } from "../users/user.model";
import { PERMISSIONS } from "../../auth/permissions";

export function findExpense(criteria: Object) {
  return Expense.find(criteria)
    .populate({
      path: "employee",
      select: "name email role",
      populate: { path: "role", select: "name" },
    })
    .populate({
      path: "statusChangedBy",
      select: "name email role",
      populate: { path: "role", select: "name" },
    })
    .sort({ createdAt: -1 })
    .lean();
}

// Fetch expense reports depending on the user's permissions.
export async function getExpensesForUser(
  userId: string,
  permissions: string[]
) {
  // 1) Highest level: can view ALL expenses
  if (permissions.includes(PERMISSIONS.VIEW_ALL_EXPENSES)) {
    return findExpense({});
  }

  // 2) Mid level: can view TEAM expenses (manager-like role)
  if (permissions.includes(PERMISSIONS.VIEW_TEAM_EXPENSES)) {
    const employees = await User.find({ manager: userId }, "_id");
    const employeeIds = employees.map((e) => e._id);
    return findExpense({ employee: { $in: employeeIds } });
  }

  // 3) Default: only own expenses (normal employee)
  return findExpense({ employee: userId });
}

export function toCsv(expenses: IExpense[]): string {
  const header = [
    "id",
    "employeeName",
    "employeeRole",
    "employeeEmail",
    "category",
    "amount",
    "currency",
    "status",
    "createdAt",
    "updatedAt",
    "statusChangedBy",
  ];

  const rows = expenses.map((e: any) => [
    e._id,
    e.employee?.name ?? "",
    e.employee?.role?.name ?? "",
    e.employee?.email ?? "",
    e.category,
    e.amount,
    e.currency,
    e.status,
    e.createdAt?.toISOString?.() ?? "",
    e.updatedAt?.toISOString?.() ?? "",
    e.statusChangedBy?.role?.name ?? "",
  ]);

  return [header, ...rows]
    .map((row) =>
      row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
}
