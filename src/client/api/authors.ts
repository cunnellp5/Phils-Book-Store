export async function getAuthors() {
  const res = await fetch("/api/authors");

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to fetch authors");
}

export async function getAuthor(id: number) {
  const res = await fetch(`/api/authors/${id}`);

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to fetch author");
}
