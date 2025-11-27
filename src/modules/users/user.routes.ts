import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
// import { requireRole } from "../../middleware/rbac";
import { createUser, getUsers, changeUserRole } from "./user.controller";
import { requirePermission } from "../../middleware/permission";
import { PERMISSIONS } from "../../auth/permissions";

const router = Router();

router.use(requireAuth);

//router.use(requireRole("ADMIN")); // !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)

router.use(requireAuth, requirePermission(PERMISSIONS.MANAGE_USERS)); // Comment this and uncomment the above line if you want to restrict to ADMIN role only

// POST /api/admin/users
router.post("/", createUser);

// GET /api/admin/users
router.get("/", getUsers);

// PATCH /api/admin/users/:id/role
router.patch("/:id/role", changeUserRole);

export default router;
