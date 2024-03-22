import { DataTypes, Model, Sequelize } from "sequelize";
import { Book } from "./Book";

export class Author extends Model {}

export interface Author {
  id: number;
  firstname: string;
  lastname: string;
  bio: string;
  img: string;
  book: Book[];
}

export function initAuthor(sequelize: Sequelize) {
  Author.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
      },
    },
    { sequelize, modelName: "author" }
  );
}
