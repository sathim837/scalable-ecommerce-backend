import { Product } from "./product.model";
import { APIFeatures } from "../../common/utils/apiFeatures";

export const createProduct = async (productData: any) => {
  try {
   
    const product = new Product(productData);
   
    await product.save();
    return product;
  } catch (error) {
    
    throw error;
  }
};

export const getProducts = async (query: Record<string, any>) => {
  const searchableFields = ["name", "description"];
  const features = new APIFeatures(
    Product.find({
      isDeleted: false,
    }).populate("category"),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const Products = await features.query;
  return Products;
};
