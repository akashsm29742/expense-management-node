import { Role, IRole } from "./role.model";

export async function listRoles(): Promise<IRole[]> {
  return Role.find().sort({ name: 1 });
}

export async function setRolePermissions(
  roleName: string,
  permissions: string[]
): Promise<IRole | null> {
  return Role.findOneAndUpdate(
    { name: roleName },
    { permissions },
    { new: true }
  );
}
