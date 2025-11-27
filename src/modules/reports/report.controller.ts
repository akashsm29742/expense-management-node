// src/modules/reports/report.controller.ts
import { Request, Response } from "express";
import { getExpensesForUser, toCsv } from "./report.service";
import { HttpError } from "../../utils/http-error";

export async function listExpensesReport(req: Request, res: Response) {
  try {
    const user = req.user!; // injected by auth middleware

    const expenses = await getExpensesForUser(user.id, user.permissions || []);

    res.json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
    console.error("Report error:", err);
    return new HttpError("Error generating report", 500);
  }
}

export async function exportExpensesReport(req: Request, res: Response) {
  console.log("Generating CSV report");
  const user = req.user!;
  const expenses = await getExpensesForUser(user.id, user.permissions || []);
  console.log("Exporting expenses:", expenses.length);
  const csv = toCsv(expenses as any);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="expenses-report.csv"'
  );
  res.send(csv);
}
