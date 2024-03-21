import { AuthorBook } from "../models/AuthorBook";

export async function seedAuthorBooks() {
  await AuthorBook.bulkCreate([
    { bookId: 1, authorId: 1 },
    { bookId: 1, authorId: 5 },
    { bookId: 1, authorId: 6 },
    { bookId: 2, authorId: 2 },
    { bookId: 3, authorId: 3 },
    { bookId: 4, authorId: 4 },
    { bookId: 5, authorId: 4 },
    { bookId: 6, authorId: 4 },
  ]);
}
