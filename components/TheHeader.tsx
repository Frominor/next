import Link from "next/link";
import Navigation from "./Navigation";
const NavLinks = [
  { label: "Home", id: 1, href: "/" },
  { label: "Posts", id: 2, href: "/posts" },
  { label: "About", id: 3, href: "/about" },
];
export default function TheHeader() {
  return (
    <header
      style={{
        display: "flex",
        width: 100 + "wv",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div
        className="Name"
        style={{ color: "white", width: 20 + "%", fontSize: 15 + "px" }}
      >
        <h1>MyApp</h1>
      </div>
      <Navigation NavLinks={NavLinks}></Navigation>
    </header>
  );
}
