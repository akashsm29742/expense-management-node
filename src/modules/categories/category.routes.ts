import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/rbac";
import {
  createCategoryHandler,
  listCategoriesHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "./category.controller";
import { requirePermission } from "../../middleware/permission";
import { PERMISSIONS } from "../../auth/permissions";

const router = Router();

router.use(requireAuth);

router.get("/", listCategoriesHandler); // Any authenticated user can list categories

//router.use(requireRole("ADMIN")); // !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)

router.use(requirePermission(PERMISSIONS.MANAGE_CATEGORIES)); // Comment this and uncomment the above line if you want to restrict to ADMIN role only

router.post("/", createCategoryHandler);
router.patch("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;
