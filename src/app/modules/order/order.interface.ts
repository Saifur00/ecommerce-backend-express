export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type Query = {
  email?: RegExp;
  name?: RegExp;
  description?: RegExp;
  category?: RegExp;
};
