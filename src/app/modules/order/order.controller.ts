import { Request, Response } from 'express';
import OrderValidationSchema from './order.validation';
import { OrderServices } from './order.service';
import { Query } from './order.interface';

const createOrder = async (req: Request, res: Response) => {
  try {
    // const { order: orderData } = req.body;

    //data validation using zod
    const zodparsedOrderData = OrderValidationSchema.parse(req.body);

    //calling service function to send the request data
    const result = await OrderServices.createOrderIntoDB(zodparsedOrderData);

    //send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Insufficient product quantity') {
        res.status(400).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Order not found',
          data: error,
        });
      }
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email: string };

    const query: Query = {};

    if (email) {
      query.email = new RegExp(email, 'i');
    }

    const result = await OrderServices.getAllOrdersFromDB(query);

    let message;

    if (Object.keys(query).length === 0) {
      message = 'Orders fetched successfully!';
    } else {
      message = `Orders fetched successfully for user email!`;
    }

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'There is no order!',
      data: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
