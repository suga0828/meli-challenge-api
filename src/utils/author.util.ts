import { Author } from "../definitions/author.types";

export const getAuthor = (headers: Record<string, string>): Author => {
  const { name, lastname } = headers;

  return {
    name,
    lastname
  } as Author;
}