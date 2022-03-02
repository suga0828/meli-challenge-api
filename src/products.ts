import axios from 'axios';

import { Author } from './definitions/author.types';
import { Item } from './definitions/product.types';
import { MeliProducts, ItemsResponse } from './definitions/products.types';
import { getAuthor } from './utils/author.util';


const ITEMS_PATH = (query: string) => `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

const products = async (req: any, res: any): Promise<void> => {
  const { q } = req.query;

  const author: Author = getAuthor(req.headers);

  try {
    const { data }: { data: MeliProducts } = await axios.get(ITEMS_PATH(q));

    
    const categories: string[] = data.filters.find(({ id }) => id === 'category').values[0].path_from_root.map(({ name }) => name);
    
    const items: Item[] = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 2,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: item.description,
    }));

    const response: ItemsResponse = {
      author,
      categories,
      items,
    };

    console.log(`getting products bye query: ${q}`);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default products;