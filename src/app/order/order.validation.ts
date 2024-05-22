import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string(),
  price: z.number().positive({ message: "Price can't be a negative number" }),
  quantity: z
    .number()
    .positive({ message: "Quantity can't be a negative number" }),
});

export default OrderValidationSchema;
