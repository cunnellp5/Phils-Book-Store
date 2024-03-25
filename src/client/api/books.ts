export async function getBooks() {
  const res = await fetch("/api/books");

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to fetch books");
}

export async function getBook(id: number) {
  const res = await fetch(`/api/books/${id}`);

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to fetch book");
}

export async function addBook(data: {
  title: string;
  genera: string;
  authors: string[];
}) {
  const res = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to add book");
}

export async function deleteBook(id: number) {
  const res = await fetch(`/api/books/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to delete book");
}
