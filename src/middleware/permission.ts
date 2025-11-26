// src/middleware/permission.ts
import { Request, Response, NextFunction } from "express";
import { User } from "../modules/users/user.model";
import { IRole } from "../modules/roles/role.model";

// Checks if the user's role has ANY of the required permissions.
export function requirePermission(...requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUser = req.user;
      if (!authUser) {
        return res.status(401).json({ message: "Unauthenticated" });
      }

      const dbUser = await User.findById(authUser.id).populate<{ role: IRole }>(
        "role"
      );

      if (!dbUser || !dbUser.role) {
        return res.status(403).json({ message: "Role not found" });
      }

      const role = dbUser.role as IRole;
      const userPermissions = role.permissions || [];

      const hasPermission = requiredPermissions.some((p) =>
        userPermissions.includes(p)
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (err) {
      console.error("requirePermission error:", err);
      res.status(500).json({ message: "Permission check failed" });
    }
  };
}
