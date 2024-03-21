import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

import "./App.css";

import * as TodoAPI from "./api/todos";
import { Todo } from "../server/models/Todo";
import { Link } from "react-router-dom";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 500,
});

const LinkButtons = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;
  padding: 2rem 5rem;

  & > a {
    margin: 0.2rem;
    text-align: center;
    text-decoration: none;
    color: black;
    background-color: lightgray;
    padding: 0.5rem 1.5rem;
  }

  & > a:hover {
    background-color: gray;
    color: white;
  }
`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function sortTodos(todos: Todo[]) {
    const sorted = todos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      }
      if (!a.completed && b.completed) {
        return -1;
      }
      return 0;
    });
    setTodos(sorted);
  }

  useEffect(() => {
    try {
      TodoAPI.getTodos().then((data): void => {
        sortTodos(data);
      });
    } catch (err) {
      console.log("failed to fetch todos", err);
    }
  }, []);

  const addTodo = useCallback(async (description: string) => {
    await TodoAPI.addTodo(description);
    TodoAPI.getTodos().then((data): void => {
      sortTodos(data);
    });
  }, []);

  const handleChange = useCallback(async (id: number, isCompleted: boolean) => {
    await TodoAPI.toggleTodo(id, isCompleted);
    TodoAPI.getTodos().then((data): void => {
      sortTodos(data);
    });
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    await TodoAPI.deleteTodo(id);
    TodoAPI.getTodos().then((data): void => {
      sortTodos(data);
    });
  }, []);

  const handleUpdate = useCallback(async (id: number, description: string) => {
    await TodoAPI.updateTodo(id, description);
    TodoAPI.getTodos().then((data): void => {
      sortTodos(data);
    });
  }, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggle={handleChange}
            onDelete={handleDelete}
            updateTodo={handleUpdate}
          />
        ))}
      </TodoList>
      <LinkButtons>
        <Link to={`books`}>Books</Link>
        <Link to={`authors`}>Authors</Link>
      </LinkButtons>
    </Wrapper>
  );
}

export default App;
