// src/modules/reports/report.service.ts
import { Expense } from "../expenses/expense.model";
import { User } from "../users/user.model";
import { PERMISSIONS } from "../../auth/permissions";

// Fetch expense reports depending on the user's permissions.
export async function getExpensesForUser(
  userId: string,
  permissions: string[]
) {
  // 1) Highest level: can view ALL expenses
  if (permissions.includes(PERMISSIONS.VIEW_ALL_EXPENSES)) {
    return Expense.find()
      .populate("employee", "name email")
      .sort({ createdAt: -1 });
  }

  // 2) Mid level: can view TEAM expenses (manager-like role)
  if (permissions.includes(PERMISSIONS.VIEW_TEAM_EXPENSES)) {
    const employees = await User.find({ manager: userId }, "_id");
    const employeeIds = employees.map((e) => e._id);

    return Expense.find({ employee: { $in: employeeIds } })
      .populate("employee", "name email")
      .sort({ createdAt: -1 });
  }

  // 3) Default: only own expenses (normal employee)
  return Expense.find({ employee: userId })
    .populate("employee", "name email")
    .sort({ createdAt: -1 });
}
