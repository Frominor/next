import Link from "next/dist/client/link";
import { getPosts } from "../api/getDatas/getPosts";
export default async function Posts() {
  const posts = await getPosts();
  return (
    <div className="Posts">
      {posts.map((post) => {
        return (
          <Link
            href={`posts/${post.id}`}
            className="Post"
            style={{ textDecoration: "none", color: "white" }}
            key={post.id}
          >
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </Link>
        );
      })}
    </div>
  );
}
