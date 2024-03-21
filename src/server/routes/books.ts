import { Router } from "express";
import { RoutesErrorHandler } from "../utils/isError";

import { Book } from "../models/Book";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
