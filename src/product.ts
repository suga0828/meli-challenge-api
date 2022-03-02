import axios from 'axios';

import { Author } from './definitions/author.types';
import { Description } from './definitions/description.types';
import { Item } from './definitions/product.types';
import { getAuthor } from './utils/author.util';

const ITEM_PATH = (id: string) => `https://api.mercadolibre.com/items/${id}`;
const ITEM_DESCRIPTION_PATH = (id: string) => `https://api.mercadolibre.com/items/${id}/description`;

const product = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;
  const author: Author = getAuthor(req.headers);

  try {
    const data = await Promise.all([
      axios.get(ITEM_PATH(id)),
      axios.get(ITEM_DESCRIPTION_PATH(id)),
    ]);

    const [el, description] = data.map(({ data }) => data);

    const item: Item = {
      id: el.id,
      title: el.title,
      price: {
        currency: el.currency_id,
        amount: el.price,
        decimals: 2,
      },
      picture: el.thumbnail,
      condition: el.condition,
      free_shipping: el.shipping.free_shipping,
      sold_quantity: el.sold_quantity,
      description: (description as Description).plain_text,
    } 

    console.log(`getting product with id: ${id}`);
    res.json({ author, item});
  } catch (error) {
    res.status(500).json(error);
  }
};

export default product; 
