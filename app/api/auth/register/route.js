import { NextResponse } from "next/server";
import User from "../../../../models/User";
export const POST = async (req) => {
  const body = await req.json();
  const name = body.name;

  const password = body.password;
  const email = body.email;

  const user = new User({
    name,
    password,
    email,
  });
  if (user) {
    await user.save();
    return NextResponse.json({
      name,
      password,
      email,
      message: "Пользователь создан",
    });
  } else {
    return NextResponse.json({ message: "Ошибка" });
  }
};
