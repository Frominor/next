import Post from "@/models/Post";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  const body = await req.json();

  const findedPost = await Post.findById(body.id);
  console.log("123", findedPost);
  try {
    return new NextResponse(JSON.stringify(findedPost));
  } catch (error) {
    return new NextResponse(JSON.stringify(findedPost));
  }
};
