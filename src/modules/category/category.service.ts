import { AppError } from "../../common/errors/AppError";
import { logger } from "../../config/logger";
import { Category } from "./category.model";

export const createCategory = async (payload: {
  name: string;
  slug: string;
}) => {
  
  const findCategory = await Category.findOne({ slug: payload.slug });
  if (findCategory) {
    throw new AppError("Category with this slug already exists", 400);
  }

  const category = await Category.create(payload);

  return category;
};

export const getCategories = async () => {
  const categories = await Category.find();
  return categories;
}
