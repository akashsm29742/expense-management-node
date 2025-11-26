import { Request, Response } from "express";
import { listRoles, setRolePermissions } from "./role.service";
import { HttpError } from "../../utils/http-error";

import { PERMISSIONS, Permission } from "../../auth/permissions";

const ALL_PERMISSIONS = new Set(Object.values(PERMISSIONS));

export async function setRolePermissionsHandler(req: Request, res: Response) {
  const { name } = req.params;
  const { permissions } = req.body as { permissions: Permission[] };

  // Validate against registry
  const invalid = permissions.filter((p) => !ALL_PERMISSIONS.has(p));
  if (invalid.length > 0) {
    return new HttpError("Invalid permissions", 400);
  }

  const role = await setRolePermissions(name, permissions as Permission[]);
  if (!role) return new HttpError("Role not found", 404);

  res.json({ success: true, data: role });
}

export async function listRolesHandler(_req: Request, res: Response) {
  const roles = await listRoles();
  res.json({ success: true, data: roles });
}
