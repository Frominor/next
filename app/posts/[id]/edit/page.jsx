import { redirect } from "next/navigation";
import EditPostForm from "../../../../components/edit-post-form";
import { revalidatePath } from "next/cache";

import { getPost } from "../page";
const updatepost = async (obj, id) => {
  "use server";
  const { title, description } = obj;
  const res = await fetch(`http://localhost:3000/api/editpost`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      id,
    }),
  });
  const post = await res.json();
  revalidatePath(`/posts/${id}`);
  redirect(`/posts/${id}`);
};
export default async function EditPost({ params }) {
  const post = await getPost(params.id);

  return (
    <EditPostForm
      post={post}
      updatepost={updatepost}
      id={params.id}
    ></EditPostForm>
  );
}
