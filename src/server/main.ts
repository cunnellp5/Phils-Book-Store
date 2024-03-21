import { createServer } from "./vite-server";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

import { initTodo } from "./models/Todo";
import { initAuthor, Author } from "./models/Author";
import { initBook, Book } from "./models/Book";
import { initAuthorBook, AuthorBook } from "./models/AuthorBook";

import { seedData } from "./Seeds/index";

import APIRoutes from "./routes/api";

import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  const sequelize = new Sequelize({
    dialect: process.env.DB_TYPE,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });

  // init the models in the db
  initAuthor(sequelize);
  initBook(sequelize);
  initAuthorBook(sequelize);
  initTodo(sequelize);

  // create relationships
  Author.belongsToMany(Book, { through: AuthorBook });
  Book.belongsToMany(Author, { through: AuthorBook });

  const { serve, app } = await createServer();

  app.get("/test", (_, res) => {
    res.json({ hello: "worlddd" });
  });

  app.use(bodyParser.json());
  app.use("/api", APIRoutes);

  sequelize.sync().then(async () => {
    await seedData();
    serve();
  });
};

start();
