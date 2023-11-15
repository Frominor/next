"use client";
import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";

import Container from "@mui/material/Container";
import { CSSTransition } from "react-transition-group";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, Controller, useFormState } from "react-hook-form";
import { revalidatePath } from "next/cache";
const theme = createTheme({});
export default function SignIn() {
  const [Success, SetSuccess] = React.useState(null);
  const [showMessage, setShowMessage] = React.useState(false);
  const session = useSession();
  const [ShowButton, setShowButton] = React.useState(false);
  const nodeRef = React.useRef(null);
  const { register, handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
  });
  const router = useRouter();
  const { errors } = useFormState({
    control,
  });
  React.useEffect(() => {
    function close() {
      const timeout = setTimeout(() => {
        SetSuccess(null);
      }, 5000);
    }
    close();
  }, []);
  const onSubmit = async (obj) => {
    const { description, title } = obj;
    reset(obj);
    const authorName = session.data.user.name;
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          description,
          title,
          authorName,
        }),
      });
      if (res.status === 200) {
        SetSuccess(true);
        setShowMessage(true);
      }
    } catch (err) {
      SetSuccess(false);
    }
    reset({
      title: "",
      description: "",
    });
    revalidatePath("../posts");
    redirect("/posts");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        id="regsiterbox"
        sx={{ position: "relative" }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h4" variant="h2" id={"dasdadad"}>
            Создание поста
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={16} sm={16} sx={{ mb: 2, mt: 2 }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Введите заголовок" }}
                  render={({ field }) => (
                    <TextField
                      name="title"
                      fullWidth
                      id="title"
                      InputProps={{
                        sx: {
                          color: "black",
                          background: "white",
                          width: 1000,
                        },
                      }}
                      variant="outlined"
                      sx={{ color: "white" }}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      error={!!errors.title?.message}
                      helperText={errors.title?.message}
                      label="Заголовок"
                    />
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required: "Введите содержание поста",
                    min: 5,
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      className="registerfield"
                      id="filled-hidden-label-small"
                      label={"Текст поста"}
                      multiline
                      rows={5}
                      maxRows={10}
                      error={!!errors.description?.message}
                      InputProps={{
                        sx: {
                          color: "black",
                          background: "white",
                        },
                      }}
                      value={field.value}
                      variant="outlined"
                      helperText={errors.description?.message}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: 200,
                background: "black",
                fontFamily: "revert",
              }}
            >
              Создать пост
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>

      {Success ? (
        <CSSTransition
          in={Success}
          nodeRef={nodeRef}
          timeout={700}
          classNames="alert"
          unmountOnExit
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >
          <Alert
            sx={{
              position: "absolute",
              bottom: 40,
              right: 50,
              color: "white",
              background: "#29DB00",
            }}
            ref={nodeRef}
            variant="primary"
            dismissible
            onClose={() => SetSuccess(false)}
          >
            <p>Пост успешно создан</p>
          </Alert>
        </CSSTransition>
      ) : Success == false ? (
        <CSSTransition
          in={!Success}
          nodeRef={nodeRef}
          timeout={400}
          classNames="alert"
          unmountOnExit
          onEnter={() => setShowButton(false)}
          onExited={() => setShowButton(true)}
        >
          <Alert
            sx={{
              position: "absolute",
              bottom: 40,
              right: 50,
              color: "white",
              background: "#DB0004",
            }}
            ref={nodeRef}
            variant="primary"
            dismissible
            onClose={() => SetSuccess(false)}
          >
            <p>Ошибка в создании поста</p>
          </Alert>
        </CSSTransition>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
}
