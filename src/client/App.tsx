import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

import "./App.css";

import * as API from "./api";
import { Todo } from "../server/models/Todo";
import { Link } from "react-router-dom";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 500,
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      API.getTodos().then(setTodos);
    } catch (err) {
      console.log("failed to fetch todos", err);
    }
  }, []);

  const addTodo = useCallback(async (description: string) => {
    await API.addTodo(description);
    API.getTodos().then(setTodos);
  }, []);

  const handleChange = useCallback(async (id: number, isCompleted: boolean) => {
    await API.toggleTodo(id, isCompleted);
    API.getTodos().then(setTodos);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await API.deleteTodo(id);
    API.getTodos().then(setTodos);
  }, []);

  const handleUpdate = useCallback(async (id: number, description: string) => {
    await API.updateTodo(id, description);
    API.getTodos().then(setTodos);
  }, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo, i) => (
          <TodoItem
            key={i}
            todo={todo}
            toggle={handleChange}
            onDelete={handleDelete}
            updateTodo={handleUpdate}
          />
        ))}
      </TodoList>
      <Link to={`books`}>Books</Link>
      <Link to={`authors`}>authors</Link>
    </Wrapper>
  );
}

export default App;
