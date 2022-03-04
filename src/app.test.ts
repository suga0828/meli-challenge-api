import request from 'supertest';
import axios from 'axios';

import app from './app';

import { Item, ItemResponse } from './definitions/product.types';
import { MeliProducts } from './definitions/products.types';

const NAME = 'name';
jest.mock('./utils/author.util', () => ({
  getAuthor: jest.fn(({ name, lastname }) => ({ name, lastname })),
}));

const ID = 'id';
const MOCKED_ITEM = {
  id: ID,
  shipping: {},
  seller_address: { state: {} },
} as unknown as Item;

const Q = 'query';
const MOCKED_ITEMS = {
  results: [],
  filters: [{ id: 'category', values: [{ path_from_root: [] }] }],
} as unknown as MeliProducts;

describe('app', () => {
  describe('/api/items/:id', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should get product on success', async () => {
      jest.clearAllMocks();
      jest
        .spyOn(axios, 'get')
        .mockReturnValue(Promise.resolve({ data: MOCKED_ITEM }));

      const response = await request(app)
        .get(`/api/items/${ID}`)
        .set('name', NAME);

      expect(response.statusCode).toBe(200);
      expect((response.body as ItemResponse).item.id).toBe(ID);
      expect((response.body as ItemResponse).author.name).toBe(NAME);
    });

    xtest('should return error on error', () => {
      jest.clearAllMocks();
      const ERROR = 'casita';
      const spy = jest
        .spyOn(axios, 'get')
        .mockReturnValue(Promise.reject(ERROR));

      request(app)
        .get(`/api/items/${ID}`)
        .catch((error) => {
          expect(error.statusCode).toBe(500);
          expect(error.response.body.error).toBe(ERROR);
          spy.mockClear();
        });
    });
  });

  describe('/api/items', () => {
    test('should get products and category on success', async () => {
      jest.clearAllMocks();
      jest
        .spyOn(axios, 'get')
        .mockReturnValue(Promise.resolve({ data: MOCKED_ITEMS }));

      const response = await request(app)
        .get(`/api/items?q=${Q}`)
        .set('name', NAME);

      expect(response.statusCode).toBe(200);
      expect((response.body as ItemResponse).author.name).toBe(NAME);
    });
  });
});
