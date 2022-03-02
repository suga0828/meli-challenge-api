import express from 'express';

import product from './product';
import products from './products';

const app = express()
const port = 3000

app.get('/api/items/:id', product);
app.get('/api/items', products);

app.use(express.json());

app.listen(process.env.PORT || port, () => {
  console.log(`meli-challenge-api app listening on port ${port}`)
})