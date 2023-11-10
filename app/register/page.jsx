"use client";
import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import { useForm, Controller, useFormState } from "react-hook-form";
import "./page.module.css";
import Link from "next/link";
const theme = createTheme({});
export default function SignIn() {
  const { register, handleSubmit, control } = useForm({ mode: "onSubmit" });
  const router = useRouter();
  const { errors } = useFormState({
    control,
  });
  console.log(errors);
  const onSubmit = async (obj) => {
    const { name, password, email } = obj;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" id="regsiterbox">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <svg
              style={{ marginTop: 70 + "px" }}
              xmlns="http://www.w3.org/2000/svg"
              class="site__logo"
              width="56"
              height="84"
              viewBox="77.7 214.9 274.7 412"
            >
              <defs>
                <linearGradient id="a" x1="0%" y1="0%" y2="0%">
                  <stop offset="0%" stop-color="#8ceabb" />
                  <stop offset="100%" stop-color="#378f7b" />
                </linearGradient>
              </defs>
              <path
                fill="url(#a)"
                d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
              />
            </svg>
          </div>
          <Typography component="h4" variant="h2" id={"dasdadad"}>
            Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} sx={{ mb: 2, mt: 2 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Введите NickName" }}
                  render={({ field }) => (
                    <TextField
                      name="name"
                      fullWidth
                      id="name"
                      InputLabelProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      variant="standard"
                      sx={{ color: "white" }}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      error={!!errors.name?.message}
                      helperText={errors.name?.message}
                      label="Ник"
                      autoFocus
                    />
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Введите почту",
                    min: 5,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                      message: "Неверный формат",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      className="registerfield"
                      id="filled-hidden-label-small"
                      label={"Почта"}
                      error={!!errors.email?.message}
                      InputLabelProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      value={field.value}
                      variant="standard"
                      helperText={errors.email?.message}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                ></Controller>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Введите пароль",
                    minLength: 5,
                    maxLength: 30,
                  }}
                  render={({ field }) => (
                    <TextField
                      label={"Пароль"}
                      fullWidth
                      value={field.value}
                      variant="standard"
                      InputLabelProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      error={!!errors.password?.message}
                      helperText={errors.password?.message}
                    ></TextField>
                  )}
                ></Controller>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="registerButton"
              sx={{ mt: 8, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Link href="/login">
                  <Button
                    className="already"
                    variant="cover"
                    sx={{
                      color: "white",
                    }}
                  >
                    Уже есть аккаунт? Войти
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
