import { DataTypes, Model, Sequelize } from "sequelize";

export class Book extends Model {}

export interface Book {
  id: number;
  title: string;
  genera: string;
  img: string;
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

// id: 1,
// title: 'Python In A Nutshell',
// genera: 'Python',
// description: 'This book offers Python programmers one place to look when they need help remembering or deciphering the syntax of this open source language and its many powerful but scantily documented modules. This comprehensive reference guide makes it easy to look up the most frequently needed information--not just about the Python language itself, but also the most frequently used parts of the standard library and the most important third-party extensions.',
// img: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg'
// }),
