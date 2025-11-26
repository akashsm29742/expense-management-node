import { Request, Response } from "express";
import {
  createUserAsAdmin,
  listAllUsers,
  updateUserRole,
} from "./user.service";
import { HttpError } from "../../utils/http-error";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, roleName, managerId } = req.body;

    const user = await createUserAsAdmin({
      name,
      email,
      password,
      roleName,
      managerId,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    console.error("createUser error:", err);
    return new HttpError(
      err.message || "Error creating user",
      err.status || 500
    );
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await listAllUsers();
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err: any) {
    console.error("getUsers error:", err);
    return new HttpError(
      err.message || "Error fetching users",
      err.status || 500
    );
  }
}

export async function changeUserRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { roleName } = req.body; // e.g., "MANAGER", "EMPLOYEE"

    const user = await updateUserRole(id, roleName);

    res.json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    console.error("changeUserRole error:", err);
    return new HttpError(
      err.message || "Error updating user role",
      err.status || 500
    );
  }
}
