import React, { useCallback, useEffect, useState } from "react";
import { AddInput } from "./components/AddInput";
import { Header } from "./components/Header";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";

import "./App.css";
import { Wrapper } from "./styles/Wrapper";

import { Todo } from "../server/models/Todo";
import * as TodoAPI from "./api/todos";
import Nav from "./components/Nav";
import WindowedList from "./components/WindoList";

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
      <Nav></Nav>
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

      <WindowedList></WindowedList>
    </Wrapper>
  );
}

export default App;
