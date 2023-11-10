import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import UserSchema from "../models/User";
export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "string", require: true },
        password: { label: "password", type: "password", require: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (credentials) {
          const email = credentials.email;
          const User = await UserSchema.findOne({ email });
          console.log(User.email);
          if (email === User.email) {
            return "Ok";
          } else {
            return null;
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
