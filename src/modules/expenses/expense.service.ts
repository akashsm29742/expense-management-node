import { Expense, IExpense } from "./expense.model";
import { eventBus } from "../../core/event-bus";
import { EVENTS } from "../../events/events";
import { Category } from "../categories/category.model";
import { HttpError } from "../../utils/http-error";

export async function submitExpense(input: {
  employee: string;
  category: string;
  amount: number;
  currency?: string;
  description?: string;
}): Promise<IExpense> {
  const categoryDoc = await Category.findOne({
    name: input.category,
    active: true,
  });

  if (!categoryDoc) {
    throw new HttpError(
      `Category '${input.category}' is not valid or not active`,
      400
    );
  }

  const expense = await Expense.create({
    employee: input.employee,
    category: categoryDoc.name,
    amount: input.amount,
    currency: input.currency || "INR",
    description: input.description,
  });

  eventBus.emit(EVENTS.EXPENSE_SUBMITTED, { expenseId: expense._id });

  return expense;
}

export async function approveExpense(id: string): Promise<IExpense | null> {
  const exp = await Expense.findByIdAndUpdate(
    id,
    { status: "APPROVED" },
    { new: true }
  );
  eventBus.emit(EVENTS.EXPENSE_APPROVED, exp);
  return exp;
}

export async function rejectExpense(id: string): Promise<IExpense | null> {
  const exp = await Expense.findByIdAndUpdate(
    id,
    { status: "REJECTED" },
    { new: true }
  );
  eventBus.emit(EVENTS.EXPENSE_REJECTED, exp);
  return exp;
}
