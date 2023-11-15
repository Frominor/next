import Navigation from "./Navigation";
import Container from "@mui/material/Container";
const NavLinks = [
  { label: "Домашняя страница", id: 1, href: "/" },
  { label: "Посты", id: 2, href: "/posts" },
  { label: "Создать пост", id: 3, href: "/createpost" },
];
export default function TheHeader() {
  return (
    <header
      className="Header"
      style={{
        display: "flex",
        width: 100 + "wv",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Container
        component={"div"}
        className="Name"
        sx={{ color: "white", width: 20 + "%" }}
      >
        <h1 style={{ color: "white" }}>MyApp</h1>
      </Container>
      <Navigation NavLinks={NavLinks}></Navigation>
    </header>
  );
}
