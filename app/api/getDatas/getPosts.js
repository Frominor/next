export async function getPosts() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!data) {
    return null;
  }
  return data.json();
}
