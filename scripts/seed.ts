// scripts/seed.ts

import bcrypt from "bcryptjs";
import { connectDB } from "../src/core/db";
import { Role } from "../src/modules/roles/role.model";
import { User } from "../src/modules/users/user.model";
import { Category } from "../src/modules/categories/category.model";
import { Expense } from "../src/modules/expenses/expense.model";
import { PERMISSIONS } from "../src/auth/permissions";

async function seed() {
  console.log("Starting seed...");

  await connectDB();

  // Roles
  const roleNames = [
    "EMPLOYEE",
    "MANAGER",
    "FINANCE",
    "CA",
    "HR",
    "ADMIN",
    "CEO",
    "CTO",
  ];

  // Default permissions per role
  const rolePermissions: Record<string, string[]> = {
    EMPLOYEE: [PERMISSIONS.SUBMIT_EXPENSE],
    MANAGER: [PERMISSIONS.VIEW_TEAM_EXPENSES, PERMISSIONS.APPROVE_EXPENSE],
    FINANCE: [PERMISSIONS.VIEW_ALL_EXPENSES, PERMISSIONS.EXPORT_REPORTS],
    CA: [PERMISSIONS.VIEW_ALL_EXPENSES, PERMISSIONS.EXPORT_REPORTS],
    HR: [PERMISSIONS.VIEW_ALL_EXPENSES],
    ADMIN: [
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_CATEGORIES,
      PERMISSIONS.MANAGE_ROLES,
      PERMISSIONS.VIEW_ALL_EXPENSES,
      PERMISSIONS.EXPORT_REPORTS,
    ],
    CEO: [PERMISSIONS.VIEW_ALL_EXPENSES, PERMISSIONS.EXPORT_REPORTS],
    CTO: [PERMISSIONS.VIEW_ALL_EXPENSES, PERMISSIONS.EXPORT_REPORTS],
  };

  for (const name of roleNames) {
    await Role.updateOne(
      { name },
      {
        $set: {
          name,
          permissions: rolePermissions[name] || [],
        },
      },
      { upsert: true }
    );
  }

  console.log("Roles seeded");

  const adminRole = await Role.findOne({ name: "ADMIN" });
  const managerRole = await Role.findOne({ name: "MANAGER" });
  const employeeRole = await Role.findOne({ name: "EMPLOYEE" });

  if (!adminRole || !managerRole || !employeeRole) {
    throw new Error("Critical roles missing after seed");
  }

  // Admin User
  const adminPassword = await bcrypt.hash("Admin@123", 10);

  await User.updateOne(
    { email: "admin@example.com" },
    {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: adminRole._id,
      manager: null,
    },
    { upsert: true }
  );

  console.log("Admin user seeded");

  // Manager User
  const managerPassword = await bcrypt.hash("Manager@123", 10);

  const manager = await User.findOneAndUpdate(
    { email: "manager@example.com" },
    {
      name: "Test Manager",
      email: "manager@example.com",
      password: managerPassword,
      role: managerRole._id,
      manager: null,
    },
    { upsert: true, new: true }
  );

  console.log("Test manager seeded");

  // Employee User
  const employeePassword = await bcrypt.hash("Employee@123", 10);

  await User.updateOne(
    { email: "employee@example.com" },
    {
      name: "Test Employee",
      email: "employee@example.com",
      password: employeePassword,
      role: employeeRole._id,
      manager: manager?._id || null,
    },
    { upsert: true }
  );

  console.log("Test employee seeded");

  // Categories
  const categories = [
    { name: "TRAVEL", description: "Travel related expenses" },
    { name: "FOOD", description: "Meal and food expenses" },
    { name: "OFFICE", description: "Office supplies & items" },
    { name: "OTHER", description: "Miscellaneous expenses" },
  ];

  for (const c of categories) {
    await Category.updateOne(
      { name: c.name },
      { $set: { ...c, active: true } },
      { upsert: true }
    );
  }

  console.log("Categories seeded");

  //Sample Expenses
  const employee = await User.findOne({ email: "employee@example.com" });
  const managerUser = await User.findOne({ email: "manager@example.com" });

  if (!employee || !managerUser) {
    throw new Error("Employee or Manager not found for expense seeding");
  }

  // optional: clear previous test expenses
  // await Expense.deleteMany({ employee: employee._id });

  await Expense.create([
    {
      employee: employee._id,
      category: "TRAVEL",
      amount: 1500,
      currency: "INR",
      description: "Cab to client office",
      status: "PENDING",
    },
    {
      employee: employee._id,
      category: "FOOD",
      amount: 600,
      currency: "INR",
      description: "Team lunch",
      status: "APPROVED",
      statusChangedBy: manager._id,
    },
    {
      employee: employee._id,
      category: "OFFICE",
      amount: 1200,
      currency: "INR",
      description: "Office chair repair",
      status: "REJECTED",
      statusChangedBy: manager._id,
    },
  ]);

  console.log("Sample expenses seeded");

  console.log("SEEDING COMPLETE");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
