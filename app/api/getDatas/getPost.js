export async function getPost(id) {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!data) {
    return null;
  }
  return data.json();
}
