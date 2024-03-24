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

router.post("/", async (req, res) => {
  try {
    const results = await Author.create(req.body, {
      include: Book,
    });
    res.status(201).json(results);
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (author === 0) {
      res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted" });
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

// TODO find by pk, then add to book, if needed
router.patch("/:id", async (req, res) => {
  try {
    Author.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {}
});

export default router;
