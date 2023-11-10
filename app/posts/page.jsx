import Link from "next/dist/client/link";
import { getPosts } from "../api/getDatas/getPosts";
import styles from "./page.module.css";
export default async function Posts() {
  const posts = await getPosts();
  return (
    <div className="Posts">
      {posts.map((post) => {
        return (
          <Link
            style={{ textDecoration: "none" }}
            href={`posts/${post.id}`}
            className={styles.Post}
            key={post.id}
          >
            <h1 className={styles.Title}>{post.title}</h1>
            <p className={styles.PostBody}>{post.body}</p>
            <br></br>
            <h3 className={styles.Line}>d</h3>
          </Link>
        );
      })}
    </div>
  );
}
