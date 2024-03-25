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
    return res.json(books);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: Author,
    });
    return res.json(book);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.post("/", async (req, res) => {
  if (
    !req.body.title ||
    !req.body.genera ||
    !req.body.authors ||
    !req.body.img
  ) {
    res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { title, genera, authors, img } = req.body;

    const newBook = await Book.create({ title, genera, img });

    const authorsNames = authors.reduce(
      (acc: [{ firstname: string; lastname: string }], author: string) => {
        acc.push({
          firstname: author.split(" ")[0],
          lastname: author.split(" ")[1],
        });
        return acc;
      },
      []
    );

    for (const names of authorsNames) {
      const foundAuthor = await Author.findOne({
        where: {
          firstname: names.firstname,
          lastname: names.lastname,
        },
      });

      if (foundAuthor) {
        newBook.addAuthors(foundAuthor);
      }
    }

    return res.status(201).json(newBook);
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
      return res.status(200).json({ message: "Book deleted" });
    }
    return res.status(404).json({ message: "Book not found" });
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
