// src/modules/reports/report.service.ts
import { Expense } from "../expenses/expense.model";
import { User } from "../users/user.model";

// Fetch expense reports depending on the user's role.
export async function getExpensesForRole(userId: string, role: string) {
  switch (role) {
    case "FINANCE":
    case "HR":
    case "ADMIN":
    case "CEO":
    case "CTO":
      return Expense.find()
        .populate("employee", "name email")
        .sort({ createdAt: -1 });

    case "MANAGER": {
      // Find employees reporting to this manager
      const employees = await User.find({ manager: userId }, "_id");

      const employeeIds = employees.map((e) => e._id);

      return Expense.find({ employee: { $in: employeeIds } })
        .populate("employee", "name email")
        .sort({ createdAt: -1 });
    }

    case "EMPLOYEE":
    default:
      return Expense.find({ employee: userId })
        .populate("employee", "name email")
        .sort({ createdAt: -1 });
  }
}
