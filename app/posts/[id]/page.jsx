import { Button } from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import Box from "@mui/material/Box/Box";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { getServerSession } from "next-auth";
export const getPost = async (id) => {
  "use server";
  const res = await fetch("http://localhost:3000/api/getpost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id,
    }),
  });
  revalidatePath(`/posts/${id}`);
  if (!res.ok) {
    throw new Error("Ошибка");
  }
  return res.json();
};
async function removePost(id) {
  "use server";

  await fetch("http://localhost:3000/api/deletepost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id,
    }),
  });
  revalidatePath("/posts");
  redirect("/posts");
}
export default async function Post({ params }) {
  const Post = await getPost(params.id);
  const session = await getServerSession();
  console.log(session);
  return (
    <Container
      className="Post"
      sx={{ color: "black", background: "white", padding: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 50 + "%" }}>
          {session?.user?.image ? (
            <Avatar src={session.user.image}></Avatar>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            width: 50 + "%",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontFamily: "sans-serif" }}>
            {String(new Date().getDay()) < 10
              ? String(
                  "0" +
                    new Date().getDay() +
                    ":" +
                    new Date().getUTCMonth() +
                    ":" +
                    new Date().getUTCFullYear()
                )
              : String(
                  "0" +
                    new Date().getDay() +
                    ":" +
                    new Date().getUTCMonth() +
                    ":" +
                    new Date().getUTCFullYear()
                )}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="h2"
        style={{
          margin: 0,
          textAlign: "center",
          borderBottom: "1px solid black",
        }}
      >
        {Post.title}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: 17,
          padding: 5 + "px",
          fontFamily: "monospace",
        }}
      >
        {Post.description}
      </Typography>
      {session?.user?.name == Post.authorName ? (
        <Container
          component={"form"}
          action={removePost.bind(null, params.id)}
          sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
        >
          <Link href={`/posts/${params.id}/edit`}>
            <EditIcon sx={{ minWidth: 30, minHeight: 30 }}></EditIcon>
          </Link>

          <Button
            disableRipple
            type="submit"
            sx={{
              cursor: "default",
              background: "white",
              color: "black",
              ":hover": {
                background: "white",
              },
            }}
          >
            <DeleteIcon
              sx={{ minWidth: 30, minHeight: 30, cursor: "pointer" }}
            ></DeleteIcon>
          </Button>
        </Container>
      ) : (
        ""
      )}
    </Container>
  );
}
