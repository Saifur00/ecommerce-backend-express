import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import TProductValidationSchema from './product.validation';
import { ProductQuery } from './product.interface';

//create product controller

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    //data validation using zod
    const zodparsedData = TProductValidationSchema.parse(productData);

    //Calling service function to send the request data
    const result = await ProductServices.createProductIntoDB(zodparsedData);

    //send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        data: error,
      });
    }
  }
};

//get all products data controller

const getProducts = async (req: Request, res: Response) => {
  try {
    const { name, description, category } = req.query as {
      name: string;
      description: string;
      category: string;
    };

    const query: ProductQuery = {};
    let searchTerm = '';

    // creating a query based on search terms
    if (name) {
      query.name = new RegExp(name, 'i');
      searchTerm += ' ' + name + ' ';
    }

    if (description) {
      query.description = new RegExp(description, 'i');
      searchTerm += ' ' + description + ' ';
    }

    if (category) {
      query.category = new RegExp(category, 'i');
      searchTerm += '' + category + ' ';
    }

    // console.log(query);

    //calling service function
    const result = await ProductServices.getProductsFromDB(query);

    let message;

    if (Object.keys(query).length === 0) {
      message = 'Products fetched successfully!';
    } else {
      message = `Products matching search term '${searchTerm}' fetched successfully!`;
    }

    //send response
    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        data: error,
      });
    }
  }
};

//get specific product by id controller
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    console.log(productID);
    //calling service function and sending productID
    const result = await ProductServices.getSingleProductFromDB(productID);

    //send response
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        data: error,
      });
    }
  }
};

//update a product controller
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { product: updateData } = req.body;
    const { productID } = req.params;

    //calling service function and sending updateData and productID
    const result = await ProductServices.updateProductInDB(
      productID,
      updateData,
    );

    // console.log(result);

    //send response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        data: error,
      });
    }
  }
};

// delete product controller
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    //calling service function and sending user ID
    await ProductServices.deleteProductFromDB(productID);

    //send response
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        data: error,
      });
    }
  }
};

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
