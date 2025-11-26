import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/rbac";
import { createUser, getUsers, changeUserRole } from "./user.controller";
import { requirePermission } from "../../middleware/permission";

const router = Router();

// All routes in this file require ADMIN role

router.use(requireAuth, requirePermission("MANAGE_USERS"));

//router.use(requireRole("ADMIN")); // !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)

// POST /api/admin/users
router.post("/", createUser);

// GET /api/admin/users
router.get("/", getUsers);

// PATCH /api/admin/users/:id/role
router.patch("/:id/role", changeUserRole);

export default router;
