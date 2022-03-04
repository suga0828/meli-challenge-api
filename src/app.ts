import express from 'express';
import cors from 'cors';

import product from './product';
import products from './products';

const app = express();

const whitelist = [
  'http://localhost:3000',
  'https://suga0828-meli-challenge.vercel.app',
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/api/items/:id', product);
app.get('/api/items', products);

export default app;
