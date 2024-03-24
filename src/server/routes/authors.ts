import { Router } from "express";
import { RoutesErrorHandler } from "../utils/isError";

import { Author } from "../models/Author";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error: Error | unknown) {
    RoutesErrorHandler(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    res.json(author);
  } catch (error: Error | unknown) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
