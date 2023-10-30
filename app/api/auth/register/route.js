import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { CoonectDb } from "../../connect";
export const POST = async (req) => {
  const { name, email, password } = await req.json();
  await CoonectDb();
  const user = new User({
    name,
    password,
    email,
  });
  try {
    await user.save();
    return new NextResponse("Человечек создался");
  } catch (error) {
    return new NextResponse("Человечек не создался");
  }
};
