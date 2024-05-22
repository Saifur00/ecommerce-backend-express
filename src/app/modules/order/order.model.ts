import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../product/product.model';

//Creating order schema
const orderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

//pre middleware to handle the inventory update in Product collection
orderSchema.pre('save', async function (next) {
  const orderQuantity = this.quantity;
  const productId = this.productId;

  // Find the product document using the productId from order
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  // Check if there is sufficiant product available for ordering

  if (product.inventory.quantity < orderQuantity) {
    throw new Error('Insufficient product quantity');
  }

  // Update product quantity
  product.inventory.quantity -= orderQuantity;
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }
  await product.save();

  next();
});

//creating order model
export const Order = model<TOrder>('Order', orderSchema);
