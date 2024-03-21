import { Router } from "express";
import todos from "./todos";
import books from "./books";
import authors from "./authors";

const router = Router();

router.use("/todos", todos);
router.use("/books", books);
router.use("/authors", authors);

export default router;
