import { getServerSession } from "next-auth/next";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Link from "next/link";
const getAllPosts = async () => {
  const session = await getServerSession();
  console.log(session);
  const res = await fetch(
    `http://localhost:3000/api/posts?authorName=${session?.user?.name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.ok) {
    return res.json();
  } else {
    return "Ошибка";
  }
};

export default async function Posts() {
  const session = await getServerSession();
  const posts = await getAllPosts();
  console.log(posts);
  return (
    <Grid className="Posts" container spacing={4}>
      {posts.map((post) => {
        return (
          <Grid
            key={post._id}
            item
            xs={2}
            sx={{
              marginTop: 5,
              marginLeft: 5,
              transition: "300ms ease-in-out",
              ":hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Card sx={{ minWidth: 275, minHeight: 200 }}>
              <CardContent sx={{ padding: 0 }}>
                <CardContent
                  sx={{ padding: 0, display: "flex", alignItems: "center" }}
                >
                  <CardMedia
                    sx={{
                      width: 100 + "%",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10 + "px",
                    }}
                  >
                    {session?.user?.image ? (
                      <Avatar src={session.user.image}></Avatar>
                    ) : (
                      ""
                    )}
                  </CardMedia>
                </CardContent>
                <Typography
                  sx={{
                    borderBottom: "1px solid black",
                    fontSize: 20,
                    fontFamily: "monospace",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  color="black"
                  gutterBottom
                >
                  {post.title}
                </Typography>

                <Typography variant="body2" sx={{ padding: 1 }}>
                  {post.description}
                  <br />
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: 100,
                  alignItems: "end",
                }}
              >
                <Typography sx={{ fontFamily: "sans-serif", fontSize: 10 }}>
                  {session?.user?.name}
                  {String(new Date().getDay()) < 10
                    ? String(
                        "   " +
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
                <Link href={`posts/${post._id}`}>
                  <Button
                    variant="contained"
                    sx={{ width: 100 + "px", height: 30 + "px", fontSize: 10 }}
                  >
                    Подробнее
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
