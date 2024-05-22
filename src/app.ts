import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

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
