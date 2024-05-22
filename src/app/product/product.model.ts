import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';

//creating variants schema
const variantSchema = new Schema<TVariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

//creating inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

//creating product schema
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String] },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

//creating the Product model
export const Product = model<TProduct>('Product', productSchema);
