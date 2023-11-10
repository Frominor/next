import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import UserSchema from "../models/User";
import VkProvider from "next-auth/providers/vk";
import { NextResponse } from "next/server";
import YandexProvider from "next-auth/providers/yandex";
export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    VkProvider({
      clientId: process.env.VK_ID,
      clientSecret: process.env.VK_SECRET,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_ID,
      clientSecret: process.env.YANDEX_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "string", require: true },
        password: { label: "password", type: "password", require: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (credentials) {
          const { email, password } = credentials;
          const User = await UserSchema.findOne({ email });
          if (email === User.email) {
            if (password === User.password) {
              return NextResponse.json({
                User,
                message: "Успешно",
              });
            } else {
              return NextResponse.json({
                error: "Неверный логин или пароль",
              });
            }
          } else {
            return NextResponse.json({
              error: "Такого пользователя нет",
            });
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
