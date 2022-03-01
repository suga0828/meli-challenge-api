import { Author } from "./author.types";
import { Item } from "./product.types";

export interface MeliProducts {
  results: any[];
  filters: {
    id: string;
    values: {
      name: string }[];
    }[]; 
}

export interface ItemsResponse {
  author: Author;
  categories: string[];
  items: Item[];
}
