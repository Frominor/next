import Post from "@/models/Post";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  const body = await req.json();
  try {
    console.log(body.id);
    const deletedPost = await Post.findByIdAndDelete(body.id);
    console.log(deletedPost);
    return new NextResponse(
      JSON.stringify({
        message: "Удалено успешно",
      })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Ошибка при удалении поста",
      })
    );
  }
};
