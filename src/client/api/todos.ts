const headers = {
  "Content-Type": "application/json",
};

export async function getTodos() {
  const resp = await fetch("/api/todos");
  if (resp.ok) {
    const todos = await resp.json();
    return todos;
  }
  throw new Error("Unable to fetch todo list");
}

export async function addTodo(description: string) {
  const resp = await fetch("/api/todos", {
    method: "POST",
    headers,
    body: JSON.stringify({ description }),
  });
  if (resp.ok) {
    return true;
  }

  throw new Error("Unable to add todo");
}

export async function deleteTodo(id: number) {
  const resp = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });

  if (resp.ok) {
    return true;
  }

  throw new Error("Unable to delete todo");
}

export async function toggleTodo(id: number, isCompleted: boolean) {
  const resp = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ completed: isCompleted }),
  });
}

export async function updateTodo(id: number, description: string) {
  const resp = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ description: description }),
  });

  if (resp.ok) {
    return true;
  }

  throw new Error("Unable to edit todo");
}
