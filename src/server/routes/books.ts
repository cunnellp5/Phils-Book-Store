import { Router } from "express";
import { RoutesErrorHandler } from "../utils/isError";

import { Book } from "../models/Book";
import { Author } from "../models/Author";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll({
      include: Author,
      order: [["title", "ASC"]],
    });
    res.json(books);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: Author,
    });
    res.json(book);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body, {
      include: Author,
    });
    res.status(201).json(newBook);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

// TODO find by pk, then add to author, if needed
router.patch("/:id", async (req, res) => {
  try {
    const bookToUpdate = await Book.findByPk(req.params.id);

    if (!bookToUpdate) {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedBook === 1) {
      res.status(200).json({ message: "Book deleted" });
    }
    res.status(404).json({ message: "Book not found" });
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
