import { Request, Response } from "express";
import {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory,
} from "./category.service";
import { HttpError } from "../../utils/http-error";

export async function createCategoryHandler(req: Request, res: Response) {
  const { name, description } = req.body;
  const category = await createCategory({ name, description });
  res.status(201).json({ success: true, data: category });
}

export async function listCategoriesHandler(req: Request, res: Response) {
  if (!req.user) return new HttpError("Unauthorized", 401);
  const onlyActive = req.user.role !== "ADMIN" ? true : false;
  const categories = await listCategories(onlyActive);
  res.json({ success: true, data: categories });
}

export async function updateCategoryHandler(req: Request, res: Response) {
  const { id } = req.params;
  const category = await updateCategory(id, req.body);
  if (!category) return new HttpError("Category not found", 404);
  res.json({ success: true, data: category });
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  const { id } = req.params;
  await deleteCategory(id);
  res.status(204).send();
}
