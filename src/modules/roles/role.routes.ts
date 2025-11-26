import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/rbac";
import { listRolesHandler, setRolePermissionsHandler } from "./role.controller";

const router = Router();

//router.use(requireRole("ADMIN")); // !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)

router.get("/", listRolesHandler);
router.patch("/:name/permissions", setRolePermissionsHandler);

export default router;
