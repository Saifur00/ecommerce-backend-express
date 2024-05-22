import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

//route for creating post

router.post('/create-product', ProductControllers.createProduct);

//get all products route
router.get('/', ProductControllers.getProducts);

//get single product route
router.get('/:productID', ProductControllers.getSingleProduct);

//find and update product route
router.put('/:productID', ProductControllers.updateProduct);

//find and delete product route
router.delete('/:productID', ProductControllers.deleteProduct);

export const ProductRoutes = router;
