import { Category, ICategory } from "./category.model";

export async function createCategory(data: {
  name: string;
  description?: string;
}): Promise<ICategory> {
  return Category.create({
    name: data.name,
    description: data.description,
  });
}

export async function listCategories(
  onlyActive: boolean
): Promise<ICategory[]> {
  if (onlyActive) {
    return Category.find({ active: true }).sort({ name: 1 });
  }
  return Category.find().sort({ name: 1 });
}

export async function updateCategory(
  id: string,
  data: Partial<Pick<ICategory, "name" | "description" | "active">>
): Promise<ICategory | null> {
  return Category.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteCategory(id: string): Promise<void> {
  await Category.findByIdAndDelete(id);
}
