import { Book } from "../models/Book";
import { Author } from "../models/Author";
import { AuthorBook } from "../models/AuthorBook";

import { seedBooks } from "./seedBooks";
import { seedAuthors } from "./seedAuthors";
import { seedAuthorBooks } from "./seedAuthorBooks";

export async function seedData() {
  try {
    // Check if any data exists in the books table
    const existingBooks = await Book.count();
    if (existingBooks === 0) {
      console.log("Seeding books...");
      await seedBooks();
    }

    // Check if any data exists in the authors table
    const existingAuthors = await Author.count();
    if (existingAuthors === 0) {
      console.log("Seeding authors...");
      await seedAuthors();
    }

    // Check if any data exists in the author-books relations table
    const existingAuthorBooks = await AuthorBook.count();
    if (existingAuthorBooks === 0) {
      console.log("Seeding author-books relations...");
      await seedAuthorBooks();
    }
  } catch (e) {
    console.error("Error occurred during seeding:", e);
    throw new Error("Error seeding database.");
  }
}
