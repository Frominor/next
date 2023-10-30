import { getPost } from "@/app/api/getDatas/getPost";
export default async function Post({ params }) {
  const Post = await getPost(params.id);

  return (
    <div className="Post" style={{ color: "white" }}>
      <h1>{Post.title}</h1>
      <p>{Post.body}</p>
    </div>
  );
}
