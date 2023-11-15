import { NextResponse } from "next/server";
import Post from "../../../models/Post";
export const PATCH = async (req) => {
  const body = await req.json();
  console.log(body);
  const updatedpost = await Post.findByIdAndUpdate(body.id, {
    title: body.title,
    description: body.description,
  });
  if (updatedpost) {
    return new NextResponse(
      JSON.stringify({
        updatedpost,
      })
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        message: "Ошибка при обновлении поста",
      })
    );
  }
};
