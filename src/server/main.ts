import { createServer } from "./vite-server";
import { Sequelize } from "sequelize";
import bodyParser from "body-parser";

import { initTodo } from "./models/Todo";
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

  initTodo(sequelize);

  const { serve, app } = await createServer();

  app.get("/test", (_, res) => {
    res.json({ hello: "worlddd" });
  });

  app.use(bodyParser.json());
  app.use("/api", APIRoutes);

  sequelize.sync().then(() => {
    serve();
  });
};

start();
