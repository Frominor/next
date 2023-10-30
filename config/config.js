import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

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
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
