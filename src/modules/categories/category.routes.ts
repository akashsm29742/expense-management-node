import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { requireRole } from "../../middleware/rbac";
import {
  createCategoryHandler,
  listCategoriesHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "./category.controller";

const router = Router();

router.use(requireAuth);

router.get("/", listCategoriesHandler); // Any authenticated user can list categories

//router.use(requireRole("ADMIN")); // !!! THIS IS OVERRIDING THE PERMISSION FEATURE GIVEN IN UI FOR CHANGING PERMISSIONS (Comment this line if you want to use that feature)

router.post("/", createCategoryHandler);
router.patch("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;
