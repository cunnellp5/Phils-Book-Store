import { DataTypes, Model, Sequelize } from "sequelize";

export class AuthorBook extends Model {}

export interface AuthorBook {
  author_id: string;
  book_id: number;
}

export function initAuthorBook(sequelize: Sequelize) {
  AuthorBook.init({}, { sequelize, modelName: "author_book" });
}
