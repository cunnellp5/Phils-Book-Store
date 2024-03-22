import { DataTypes, Model, Sequelize } from "sequelize";
import { Author } from "./Author";

export class Book extends Model {}

export interface Book {
  id: number;
  title: string;
  genera: string;
  img: string;
  authors: Author[];
}

export function initBook(sequelize: Sequelize) {
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genera: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
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
    { sequelize, modelName: "book" }
  );
}
