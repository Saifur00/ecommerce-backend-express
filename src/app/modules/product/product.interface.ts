export type Tags = string[];

export type TVariants = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: Tags;
  variants: TVariants[];
  inventory: TInventory;
};

export type ProductQuery = {
  name?: RegExp;
  description?: RegExp;
  category?: RegExp;
};
