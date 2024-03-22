export async function getBooks() {
  const res = await fetch("/api/books");

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to fetch books");
}
