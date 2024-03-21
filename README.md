# Full Stack React + Express

This application is based on an Express server with a Vite middleware to handle compilation and hot module reloading in the frontend application.

```ts
app.get("/api", (req, res) => {
  res.json({ test: "hello world" });
});
```

Which you can then fetch from your frontend:

```ts
fetch("/api", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

### Accessing API

Use the API Requests tab in the right pane to make requests to the API endpoints exposed by your Express backend. Alternatively, you can make requests to your API directly from the Shell using `curl`. For instance, you can run `curl 127.0.0.1:3000/test` to see your server's output.

### Migrations

npx sequelize-cli migration:generate --name name_of_migration

npx sequelize-cli db:migrate

## start:

- $ npm i

<!-- DB SET UP Begin-->

- set up your db
  - install psql or whatever dB you wnat
  - configure your env vars that will go in the main.ts file to initialize the Sequelize ORM:
  ```
    DB_TYPE,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
  ```
  - and add your own config.json for the `sequelize-cli` when/if running migrations
  <!-- DB SET UP end -->

* $ npm run server:dev
