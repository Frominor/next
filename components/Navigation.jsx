"use client";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@mui/material";
export default function Navigation({ NavLinks }) {
  const session = useSession();
  return (
    <div
      className="Links"
      style={{
        display: "flex",
        width: 40 + "%",
        marginRight: 200,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {NavLinks.map((item) => {
        return (
          <Link
            className="NavLink"
            href={item.href}
            key={item.id}
            style={{ textDecoration: "none", color: "white" }}
          >
            {item.label}
          </Link>
        );
      })}
      {session?.data && (
        <Link
          className="NavLink"
          style={{ color: "white", textDecoration: "none" }}
          href="/profile"
        >
          Профиль
        </Link>
      )}
      {session?.data ? (
        <Link
          style={{
            color: "white",
            background: "red",
            textDecoration: "none",
            borderRadius: 5 + "px",
            padding: 5,
          }}
          href={"#"}
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Выйти
        </Link>
      ) : (
        <Link
          href="/register"
          style={{
            color: "white",
            textDecoration: "none",
            background: "#389374",
            padding: 5 + "px",
            borderRadius: 5 + "px",
          }}
        >
          Регистрация
        </Link>
      )}
    </div>
  );
}
