import { Author } from './author.types';

interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
  address: string;
}

export interface ItemResponse {
  author: Author;
  item: Item;
}
