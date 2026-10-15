import express, { Request, Response } from 'express';
import images from './routes/images';

const app = express();

app.get('/', (req: Request, res: Response): void => {
  res.send('Image Processing API is running');
});

app.use('/api/images', images);

export default app;
