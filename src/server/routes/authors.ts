import { Router } from "express";
import { RoutesErrorHandler } from "../utils/isError";

import { Author } from "../models/Author";
import { Book } from "../models/Book";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: Book,
    });
    res.json(authors);
  } catch (error: Error | unknown) {
    RoutesErrorHandler(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: Book,
    });
    res.json(author);
  } catch (error: Error | unknown) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
