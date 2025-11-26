import { Schema, model, Document, Types } from "mongoose";

export interface IExpense extends Document {
  employee: Types.ObjectId;
  category: string;
  amount: number;
  currency: string;
  description?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    description: String,
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Expense = model<IExpense>("Expense", expenseSchema);
