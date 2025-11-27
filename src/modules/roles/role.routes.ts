import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
// import { requireRole } from "../../middleware/rbac";
import { listRolesHandler, setRolePermissionsHandler } from "./role.controller";
import { PERMISSIONS } from "../../auth/permissions";
import { requirePermission } from "../../middleware/permission";

const router = Router();

router.use(requireAuth);

//router.use(requireRole("ADMIN")); // !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)

router.use(requirePermission(PERMISSIONS.MANAGE_ROLES)); // Comment this and uncomment the above line if you want to restrict to ADMIN role only

router.get("/", listRolesHandler);
router.patch("/:name/permissions", setRolePermissionsHandler);

export default router;
