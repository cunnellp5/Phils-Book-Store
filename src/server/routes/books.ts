import { Router } from "express";
import { RoutesErrorHandler } from "../utils/isError";

import { Book } from "../models/Book";
import { Author } from "../models/Author";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll({
      include: Author,
    });
    res.json(books);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
