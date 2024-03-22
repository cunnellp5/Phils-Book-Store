export async function getAuthors() {
  const res = await fetch("/api/authors");

  if (res.ok) {
    return await res.json();
  }

  throw new Error("Failed to fetch authors");
}
