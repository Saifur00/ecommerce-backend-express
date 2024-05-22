import { ProductQuery, TProduct } from './product.interface';
import { Product } from './product.model';

//create product
const createProductIntoDB = async (product: TProduct) => {
  //inserting data to DB
  const result = await Product.create(product);
  return result;
};

//get all products
const getProductsFromDB = async (query?: ProductQuery) => {
  //getting data from DB
  const result = await Product.find(query || {});

  if (!result.length) {
    throw new Error('No products matching the search criteria');
  }
  return result;
};

//get single product
const getSingleProductFromDB = async (id: string) => {
  //getting specific product info from DB
  const result = await Product.findById(id);

  return result;
};

//updating a product
const updateProductInDB = async (id: string, updateData: TProduct) => {
  //finding and updating product in DB

  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

//delete a product
const deleteProductFromDB = async (id: string) => {
  //finding and deleting product from DB

  const result = await Product.findByIdAndDelete(id);
  if (result === null) {
    throw new Error('No product found');
  }
  // console.log(`Output from result is ${result}`);

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
