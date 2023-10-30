import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import Providers from "../components/Providers";
import { CoonectDb } from "./api/connect";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posts App",
  description: "Generated by create next app",
};
CoonectDb();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TheHeader></TheHeader>
          <main>{children}</main>
          <TheFooter></TheFooter>
        </Providers>
      </body>
    </html>
  );
}