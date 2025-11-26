import bcrypt from "bcryptjs";
import { User } from "./user.model";
import { IRole, Role } from "../roles/role.model";
import { eventBus } from "../../core/event-bus";
import { EVENTS } from "../../events/events";

export async function createUserAsAdmin(input: {
  name: string;
  email: string;
  password: string;
  roleName: string; // e.g., "EMPLOYEE", "MANAGER"
  managerId?: string; // optional ObjectId string
}) {
  // Optional: prevent creating new ADMIN users via API
  if (input.roleName === "ADMIN") {
    const err = new Error("Cannot create ADMIN users via this endpoint");
    (err as any).status = 400;
    throw err;
  }

  const existing = await User.findOne({ email: input.email });
  if (existing) {
    const err = new Error("User with this email already exists");
    (err as any).status = 400;
    throw err;
  }

  const role = await Role.findOne({ name: input.roleName });
  if (!role) {
    const err = new Error(`Role '${input.roleName}' not found`);
    (err as any).status = 400;
    throw err;
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const user = await User.create({
    name: input.name,
    email: input.email,
    password: passwordHash,
    role: role._id,
    manager: input.managerId ?? null,
  });

  return user.populate("role", "name");
}

export async function listAllUsers() {
  return User.find()
    .populate("role", "name")
    .populate("manager", "name email")
    .sort({ createdAt: -1 });
}

export async function updateUserRole(userId: string, roleName: string) {
  const role = await Role.findOne({ name: roleName });
  if (!role) {
    const err = new Error(`Role '${roleName}' not found`);
    (err as any).status = 400;
    throw err;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role: role._id },
    { new: true }
  ).populate("role", "name");

  if (!user) {
    const err = new Error("User not found");
    (err as any).status = 404;
    throw err;
  }

  eventBus.emit(EVENTS.ROLE_ASSIGNED, {
    userId: user._id.toString(),
    email: user.email,
    roleName: (user.role as IRole).name,
  });

  return user;
}
