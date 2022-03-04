import { getAuthor } from './author.util';

describe('getAuthor', () => {
  it('should return author from input', () => {
    const headers = {
      name: 'name',
      lastname: 'lastname',
    };

    const author = getAuthor(headers);

    expect(author).toEqual({
      name: headers.name,
      lastname: headers.lastname,
    });
  });
});
