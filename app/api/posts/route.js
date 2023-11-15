import Post from "../../../models/Post";

import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    const posts = await Post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const { title, description, authorName } = body;
  const post = new Post({
    title,
    description,
    authorName,
  });

  if (post) {
    await post.save();
    return new NextResponse(JSON.stringify({ message: "Успешно" }));
  } else {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};
