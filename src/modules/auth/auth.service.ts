// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.model";
import { env } from "../../config/env";
import { IRole } from "../roles/role.model";

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email }).populate<{ role: IRole }>("role");
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  const role = user.role as IRole;

  const token = jwt.sign(
    {
      id: user._id,
      role: role.name,
      permissions: role.permissions,
    },
    env.jwtSecret,
    { expiresIn: "8h" }
  );

  const loginUserRes = {
    id: user._id,
    name: user.name,
    email: user.email,
    roleName: role.name,
    roleId: role._id,
    permissions: role.permissions,
  };

  return { token, user: loginUserRes };
}
