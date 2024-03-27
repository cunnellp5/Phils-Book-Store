import { createServer } from "./vite-server";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

import { initTodo } from "./models/Todo";
import { initAuthor, Author } from "./models/Author";
import { initBook, Book } from "./models/Book";
import { initAuthorBook, AuthorBook } from "./models/AuthorBook";

import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

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
  initTodo(sequelize);
  initAuthor(sequelize);
  initBook(sequelize);
  initAuthorBook(sequelize);

  // create relationships
  Author.belongsToMany(Book, { through: AuthorBook, onDelete: "CASCADE" });
  Book.belongsToMany(Author, { through: AuthorBook, onDelete: "CASCADE" });

  // vite middleware to start app and use HMR
  const { serve, app } = await createServer();

  // TEST ROUTE
  app.get("/test", (_, res) => {
    res.json({ hello: "worlddd" });
  });

  // Add route handlers
  app.use(bodyParser.json());
  app.use("/api", APIRoutes);

  // Error middle ware??
  app.use(errorHandlingMiddleware, (err, req, res, next) => {
    console.error("error middle ware hit");
    // console.error(err.stack);
    // res.status(500).send('Internal Server Error')
  });

  // build DB
  sequelize.sync().then(async () => {
    process.env.SEED_DB === "true" && (await seedData());
    serve();
  });
};

start();
