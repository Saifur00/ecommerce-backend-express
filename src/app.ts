import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes ('Telling app file go to following routes when these routes are hit by client')
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express Learning Path');
});

// Globally handling for not found routes
app.use((req: Request, res: Response) => {
  // Handle all unmatched routes here
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
