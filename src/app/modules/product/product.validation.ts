import { z } from 'zod';

// Define the TVariants schema
const TVariantsValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the TInventory schema
const TInventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Define the TProduct schema
const TProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(TVariantsValidationSchema),
  inventory: TInventoryValidationSchema,
});

export default TProductValidationSchema;
