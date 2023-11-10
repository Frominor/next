"use client";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";
export default function Navigation({ NavLinks }) {
  const session = useSession();
  return (
    <div
      className="Links"
      style={{
        display: "flex",
        width: 35 + "%",
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
        <Link style={{ color: "white" }} href="/profile">
          Профиль
        </Link>
      )}
      {session?.data ? (
        <Link
          style={{
            color: "white",
            background: "red",
            padding: 5 + "px",
            borderRadius: 5 + "px",
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
            padding: 3 + "px",
            borderRadius: 5 + "px",
          }}
        >
          Регистрация
        </Link>
      )}
    </div>
  );
}
