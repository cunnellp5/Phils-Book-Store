import { Router } from "express";

import { Todo } from "../models/Todo";
import { RoutesErrorHandler } from "../utils/isError";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(todos);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = Todo.build({ description });
    await newTodo.save();
    res.sendStatus(201);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    await todo?.destroy();
    res.sendStatus(200);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, description } = req.body;
    const todo = await Todo.findByPk(id);
    await todo?.update({ completed, description });
    res.sendStatus(201);
  } catch (error) {
    RoutesErrorHandler(res, error);
  }
});

export default router;
