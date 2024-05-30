import { Query, TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrdersFromDB = async (query?: Query) => {
  //find order
  // console.log(query);
  const result = await Order.find(query || {});
  //in case result is empty, give error, no order
  if (!result.length) {
    throw new Error('There is no order to be found');
  }
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
