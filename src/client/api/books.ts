export async function getBooks() {
  const res = await fetch("/api/books");

  if (res.ok) {
    const books = await res.json();
    return books;
  }

  throw new Error("Failed to fetch books");
}
